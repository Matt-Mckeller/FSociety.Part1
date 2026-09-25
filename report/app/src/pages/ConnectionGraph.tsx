import { useEffect, useRef, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Stack,
  Chip,
  Tooltip,
  Divider,
} from '@mui/material';
import * as d3 from 'd3';
import {
  connections,
  people,
  locations,
  organizations,
  items,
} from '../utils/dataService';

interface GraphNode extends d3.SimulationNodeDatum {
  id: string;
  name: string;
  type: 'person' | 'location' | 'organization' | 'item';
  connectionCount: number;
}

interface GraphLink extends d3.SimulationLinkDatum<GraphNode> {
  id: string;
  relationshipType?: string;
  strength?: string;
  description?: string;
  perspective?: string;
  notes?: string;
  curveOffset?: number;
}

const nodeColors: Record<string, string> = {
  person: '#1976d2',
  location: '#388e3c',
  organization: '#7b1fa2',
  item: '#ff9800',
};

const nodeRadius: Record<string, number> = {
  person: 12,
  location: 14,
  organization: 16,
  item: 10,
};

// Link colors based on strength
const strengthColors: Record<string, string> = {
  confirmed: '#4caf50',
  suspected: '#ff9800',
  theory: '#9e9e9e',
  unknown: '#bdbdbd',
};

const strengthDashArray: Record<string, string> = {
  confirmed: '0',
  suspected: '5,5',
  theory: '2,2',
  unknown: '1,3',
};

export default function ConnectionGraph() {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  const [filters, setFilters] = useState({
    person: true,
    location: true,
    organization: true,
    item: true,
  });

  const [strengthFilters, setStrengthFilters] = useState({
    confirmed: true,
    suspected: true,
    theory: true,
  });
  
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [selectedLink, setSelectedLink] = useState<GraphLink | null>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  // Get unique connection types for filtering
  const connectionTypes = useMemo(() => {
    const types = new Set<string>();
    connections.forEach(c => {
      if (c.type) types.add(c.type);
    });
    return Array.from(types);
  }, []);

  const [typeFilters, setTypeFilters] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    connections.forEach(c => {
      if (c.type) initial[c.type] = true;
    });
    return initial;
  });

  // Handle resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({
          width: rect.width,
          height: Math.max(500, window.innerHeight - 300),
        });
      }
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // D3 force simulation
  useEffect(() => {
    if (!svgRef.current) return;

    // Build nodes from all entities - defined inside useEffect to avoid dependency issues
    const buildNodes = (): GraphNode[] => {
      const nodes: GraphNode[] = [];
      
      if (filters.person) {
        people.forEach(p => {
          const connCount = connections.filter(
            c => (c.fromEntityId === p.id && c.fromEntityType === 'person') ||
                 (c.toEntityId === p.id && c.toEntityType === 'person')
          ).length;
          if (connCount > 0) {
            nodes.push({
              id: p.id,
              name: p.name,
              type: 'person',
              connectionCount: connCount,
            });
          }
        });
      }
      
      if (filters.location) {
        locations.forEach(l => {
          const connCount = connections.filter(
            c => (c.fromEntityId === l.id && c.fromEntityType === 'location') ||
                 (c.toEntityId === l.id && c.toEntityType === 'location')
          ).length;
          if (connCount > 0) {
            nodes.push({
              id: l.id,
              name: l.name,
              type: 'location',
              connectionCount: connCount,
            });
          }
        });
      }
      
      if (filters.organization) {
        organizations.forEach(o => {
          const connCount = connections.filter(
            c => (c.fromEntityId === o.id && c.fromEntityType === 'organization') ||
                 (c.toEntityId === o.id && c.toEntityType === 'organization')
          ).length;
          if (connCount > 0) {
            nodes.push({
              id: o.id,
              name: o.name,
              type: 'organization',
              connectionCount: connCount,
            });
          }
        });
      }
      
      if (filters.item) {
        items.forEach(i => {
          const connCount = connections.filter(
            c => (c.fromEntityId === i.id && c.fromEntityType === 'item') ||
                 (c.toEntityId === i.id && c.toEntityType === 'item')
          ).length;
          if (connCount > 0) {
            nodes.push({
              id: i.id,
              name: i.name,
              type: 'item',
              connectionCount: connCount,
            });
          }
        });
      }
      
      return nodes;
    };

    // Build links from connections
    const buildLinks = (nodes: GraphNode[]): GraphLink[] => {
      const nodeIds = new Set(nodes.map(n => n.id));
      
      // Filter by type and strength
      const filteredConnections = connections.filter(c => {
        if (!nodeIds.has(c.fromEntityId) || !nodeIds.has(c.toEntityId)) return false;
        if (c.type && !typeFilters[c.type]) return false;
        const strength = c.strength || 'unknown';
        if (strength === 'confirmed' && !strengthFilters.confirmed) return false;
        if (strength === 'suspected' && !strengthFilters.suspected) return false;
        if (strength === 'theory' && !strengthFilters.theory) return false;
        return true;
      });

      // Group links by source-target pair to detect duplicates
      const linkGroups: Record<string, typeof filteredConnections> = {};
      filteredConnections.forEach(c => {
        const key = [c.fromEntityId, c.toEntityId].sort().join('-');
        if (!linkGroups[key]) linkGroups[key] = [];
        linkGroups[key].push(c);
      });

      // Assign curve offsets for multiple links between same nodes
      const result: GraphLink[] = [];
      Object.values(linkGroups).forEach(group => {
        group.forEach((c, i) => {
          const offset = group.length > 1 ? (i - (group.length - 1) / 2) * 30 : 0;
          result.push({
            id: c.id,
            source: c.fromEntityId,
            target: c.toEntityId,
            relationshipType: c.type,
            strength: c.strength,
            description: c.relationshipDescription,
            perspective: c.perspective,
            notes: c.notes,
            curveOffset: offset,
          });
        });
      });

      return result;
    };

    const nodes = buildNodes();
    const links = buildLinks(nodes);

    // Clear previous
    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3.select(svgRef.current)
      .attr('width', dimensions.width)
      .attr('height', dimensions.height);

    // Define arrow markers
    const defs = svg.append('defs');
    
    ['confirmed', 'suspected', 'theory', 'unknown'].forEach(strength => {
      defs.append('marker')
        .attr('id', `arrow-${strength}`)
        .attr('viewBox', '0 -5 10 10')
        .attr('refX', 20)
        .attr('refY', 0)
        .attr('markerWidth', 6)
        .attr('markerHeight', 6)
        .attr('orient', 'auto')
        .append('path')
        .attr('fill', strengthColors[strength])
        .attr('d', 'M0,-5L10,0L0,5');
    });

    // Add zoom behavior
    const g = svg.append('g');
    
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 4])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });
    
    svg.call(zoom);

    // Create simulation
    const simulation = d3.forceSimulation<GraphNode>(nodes)
      .force('link', d3.forceLink<GraphNode, GraphLink>(links)
        .id(d => d.id)
        .distance(150))
      .force('charge', d3.forceManyBody().strength(-400))
      .force('center', d3.forceCenter(dimensions.width / 2, dimensions.height / 2))
      .force('collision', d3.forceCollide().radius(40));

    // Draw link paths (curved for multiple connections)
    const linkGroup = g.append('g').attr('class', 'links');
    
    const linkPath = linkGroup.selectAll('path')
      .data(links)
      .enter()
      .append('path')
      .attr('fill', 'none')
      .attr('stroke', d => strengthColors[d.strength || 'unknown'])
      .attr('stroke-opacity', 0.7)
      .attr('stroke-width', d => d.strength === 'confirmed' ? 2.5 : 1.5)
      .attr('stroke-dasharray', d => strengthDashArray[d.strength || 'unknown'])
      .attr('marker-end', d => `url(#arrow-${d.strength || 'unknown'})`)
      .attr('cursor', 'pointer')
      .on('click', (event, d) => {
        event.stopPropagation();
        setSelectedLink(d);
        setSelectedNode(null);
      })
      .on('mouseenter', function() {
        d3.select(this).attr('stroke-width', 4).attr('stroke-opacity', 1);
      })
      .on('mouseleave', function(_, d) {
        d3.select(this)
          .attr('stroke-width', d.strength === 'confirmed' ? 2.5 : 1.5)
          .attr('stroke-opacity', 0.7);
      });

    // Link labels (relationship type)
    const linkLabels = linkGroup.selectAll('text')
      .data(links)
      .enter()
      .append('text')
      .attr('font-size', '9px')
      .attr('fill', '#555')
      .attr('text-anchor', 'middle')
      .attr('pointer-events', 'none')
      .text(d => d.relationshipType || '');

    // Draw nodes
    const node = g.append('g')
      .attr('class', 'nodes')
      .selectAll('g')
      .data(nodes)
      .enter()
      .append('g')
      .attr('cursor', 'pointer')
      .call(d3.drag<SVGGElement, GraphNode>()
        .on('start', (event, d) => {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        })
        .on('drag', (event, d) => {
          d.fx = event.x;
          d.fy = event.y;
        })
        .on('end', (event, d) => {
          if (!event.active) simulation.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        })
      );

    // Node circles
    node.append('circle')
      .attr('r', d => nodeRadius[d.type] + Math.min(d.connectionCount * 2, 8))
      .attr('fill', d => nodeColors[d.type])
      .attr('stroke', '#fff')
      .attr('stroke-width', 2)
      .on('click', (event, d) => {
        event.stopPropagation();
        setSelectedNode(d);
      })
      .on('dblclick', (event, d) => {
        event.stopPropagation();
        const route = `/${d.type === 'person' ? 'people' : d.type + 's'}/${d.id}`;
        navigate(route);
      });

    // Node labels
    node.append('text')
      .text(d => d.name.length > 15 ? d.name.slice(0, 15) + '...' : d.name)
      .attr('x', 0)
      .attr('y', d => nodeRadius[d.type] + Math.min(d.connectionCount * 2, 8) + 12)
      .attr('text-anchor', 'middle')
      .attr('font-size', '10px')
      .attr('fill', '#333')
      .attr('pointer-events', 'none');

    // Helper function to calculate curved path
    const calculatePath = (d: GraphLink) => {
      const source = d.source as GraphNode;
      const target = d.target as GraphNode;
      const dx = target.x! - source.x!;
      const dy = target.y! - source.y!;
      const dr = Math.sqrt(dx * dx + dy * dy);
      
      if (d.curveOffset === 0 || !d.curveOffset) {
        // Straight line
        return `M${source.x},${source.y}L${target.x},${target.y}`;
      }
      
      // Curved path using quadratic bezier
      const midX = (source.x! + target.x!) / 2;
      const midY = (source.y! + target.y!) / 2;
      // Perpendicular offset
      const normX = -dy / dr;
      const normY = dx / dr;
      const ctrlX = midX + normX * d.curveOffset;
      const ctrlY = midY + normY * d.curveOffset;
      
      return `M${source.x},${source.y}Q${ctrlX},${ctrlY} ${target.x},${target.y}`;
    };

    // Helper to calculate label position
    const calculateLabelPos = (d: GraphLink) => {
      const source = d.source as GraphNode;
      const target = d.target as GraphNode;
      const dx = target.x! - source.x!;
      const dy = target.y! - source.y!;
      const dr = Math.sqrt(dx * dx + dy * dy);
      
      const midX = (source.x! + target.x!) / 2;
      const midY = (source.y! + target.y!) / 2;
      
      if (d.curveOffset && d.curveOffset !== 0) {
        const normX = -dy / dr;
        const normY = dx / dr;
        return {
          x: midX + normX * (d.curveOffset / 2),
          y: midY + normY * (d.curveOffset / 2),
        };
      }
      
      return { x: midX, y: midY - 5 };
    };

    // Tick function
    simulation.on('tick', () => {
      linkPath.attr('d', d => calculatePath(d));
      
      linkLabels
        .attr('x', d => calculateLabelPos(d).x)
        .attr('y', d => calculateLabelPos(d).y);

      node.attr('transform', d => `translate(${d.x},${d.y})`);
    });

    // Click on background to deselect
    svg.on('click', () => {
      setSelectedNode(null);
      setSelectedLink(null);
    });

    return () => {
      simulation.stop();
    };
  }, [filters, strengthFilters, typeFilters, dimensions, navigate]);

  const handleFilterChange = (type: keyof typeof filters) => {
    setFilters(prev => ({ ...prev, [type]: !prev[type] }));
  };

  const handleStrengthFilterChange = (strength: keyof typeof strengthFilters) => {
    setStrengthFilters(prev => ({ ...prev, [strength]: !prev[strength] }));
  };

  const handleTypeFilterChange = (type: string) => {
    setTypeFilters(prev => ({ ...prev, [type]: !prev[type] }));
  };

  const getNodeRoute = (node: GraphNode) => {
    const type = node.type === 'person' ? 'people' : node.type + 's';
    return `/${type}/${node.id}`;
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Connection Graph
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Visualizes relationships between entities. Drag nodes to reposition, scroll to zoom, double-click to navigate.
      </Typography>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
        {/* Graph Container */}
        <Paper
          ref={containerRef}
          sx={{
            flex: 1,
            minHeight: 500,
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <svg ref={svgRef} style={{ display: 'block' }} />
        </Paper>

        {/* Sidebar */}
        <Paper sx={{ width: { xs: '100%', md: 280 }, p: 2, flexShrink: 0 }}>
          {/* Legend */}
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
            Legend
          </Typography>
          <Stack spacing={1} sx={{ mb: 3 }}>
            {Object.entries(nodeColors).map(([type, color]) => (
              <Stack key={type} direction="row" alignItems="center" spacing={1}>
                <Box
                  sx={{
                    width: 16,
                    height: 16,
                    borderRadius: '50%',
                    backgroundColor: color,
                    border: '2px solid white',
                    boxShadow: '0 0 2px rgba(0,0,0,0.3)',
                  }}
                />
                <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                  {type}
                </Typography>
              </Stack>
            ))}
          </Stack>

          {/* Filters */}
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
            Show/Hide
          </Typography>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.person}
                  onChange={() => handleFilterChange('person')}
                  sx={{ color: nodeColors.person, '&.Mui-checked': { color: nodeColors.person } }}
                />
              }
              label="People"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.location}
                  onChange={() => handleFilterChange('location')}
                  sx={{ color: nodeColors.location, '&.Mui-checked': { color: nodeColors.location } }}
                />
              }
              label="Locations"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.organization}
                  onChange={() => handleFilterChange('organization')}
                  sx={{ color: nodeColors.organization, '&.Mui-checked': { color: nodeColors.organization } }}
                />
              }
              label="Organizations"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.item}
                  onChange={() => handleFilterChange('item')}
                  sx={{ color: nodeColors.item, '&.Mui-checked': { color: nodeColors.item } }}
                />
              }
              label="Items"
            />
          </FormGroup>

          <Divider sx={{ my: 2 }} />

          {/* Strength Filters */}
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
            Connection Strength
          </Typography>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={strengthFilters.confirmed}
                  onChange={() => handleStrengthFilterChange('confirmed')}
                  size="small"
                  sx={{ color: strengthColors.confirmed, '&.Mui-checked': { color: strengthColors.confirmed } }}
                />
              }
              label={<Typography variant="body2">Confirmed (solid)</Typography>}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={strengthFilters.suspected}
                  onChange={() => handleStrengthFilterChange('suspected')}
                  size="small"
                  sx={{ color: strengthColors.suspected, '&.Mui-checked': { color: strengthColors.suspected } }}
                />
              }
              label={<Typography variant="body2">Suspected (dashed)</Typography>}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={strengthFilters.theory}
                  onChange={() => handleStrengthFilterChange('theory')}
                  size="small"
                  sx={{ color: strengthColors.theory, '&.Mui-checked': { color: strengthColors.theory } }}
                />
              }
              label={<Typography variant="body2">Theory (dotted)</Typography>}
            />
          </FormGroup>

          <Divider sx={{ my: 2 }} />

          {/* Connection Type Filters */}
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
            Connection Types
          </Typography>
          <Box sx={{ maxHeight: 150, overflowY: 'auto' }}>
            <FormGroup>
              {connectionTypes.map(type => (
                <FormControlLabel
                  key={type}
                  control={
                    <Checkbox
                      checked={typeFilters[type] ?? true}
                      onChange={() => handleTypeFilterChange(type)}
                      size="small"
                    />
                  }
                  label={<Typography variant="body2" sx={{ fontSize: '0.75rem' }}>{type}</Typography>}
                />
              ))}
            </FormGroup>
          </Box>

          {/* Selected Link Info */}
          {selectedLink && (
            <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                Selected Connection
              </Typography>
              <Stack spacing={1}>
                <Chip
                  label={selectedLink.relationshipType || 'unknown'}
                  size="small"
                  sx={{
                    backgroundColor: strengthColors[selectedLink.strength || 'unknown'],
                    color: 'white',
                    alignSelf: 'flex-start',
                  }}
                />
                <Typography variant="body2" color="text.secondary">
                  <strong>Strength:</strong> {selectedLink.strength || 'unknown'}
                </Typography>
                {selectedLink.description && (
                  <Typography variant="body2" color="text.secondary">
                    <strong>Description:</strong> {selectedLink.description}
                  </Typography>
                )}
                {selectedLink.perspective && (
                  <Typography variant="body2" color="text.secondary">
                    <strong>Perspective:</strong> {selectedLink.perspective}
                  </Typography>
                )}
                {selectedLink.notes && (
                  <Typography variant="body2" color="text.secondary">
                    <strong>Notes:</strong> {selectedLink.notes}
                  </Typography>
                )}
              </Stack>
            </Box>
          )}

          {/* Selected Node Info */}
          {selectedNode && (
            <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                Selected Node
              </Typography>
              <Stack spacing={1}>
                <Chip
                  label={selectedNode.type}
                  size="small"
                  sx={{
                    backgroundColor: nodeColors[selectedNode.type],
                    color: 'white',
                    alignSelf: 'flex-start',
                  }}
                />
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {selectedNode.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {selectedNode.connectionCount} connection(s)
                </Typography>
                <Tooltip title="Double-click node or click here">
                  <Chip
                    label="View Details →"
                    size="small"
                    clickable
                    onClick={() => navigate(getNodeRoute(selectedNode))}
                    sx={{ alignSelf: 'flex-start' }}
                  />
                </Tooltip>
              </Stack>
            </Box>
          )}

          {/* Stats */}
          <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
              Graph Stats
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total Connections: {connections.length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              People: {people.length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Locations: {locations.length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Organizations: {organizations.length}
            </Typography>
          </Box>
        </Paper>
      </Stack>
    </Box>
  );
}
