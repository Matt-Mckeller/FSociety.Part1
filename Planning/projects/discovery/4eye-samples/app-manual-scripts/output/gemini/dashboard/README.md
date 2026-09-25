# 4eye Edu - Visualization Assessment Dashboard

## Overview

This dashboard provides a comprehensive interface to view, analyze, and assess AI-generated visualization suggestions from the 4eye Edu educational content analysis system.

## Features

### 📊 Visualization Display
- **Interactive Preview**: View all generated visualizations in embedded iframes
- **Full-screen Mode**: Open any visualization in a new tab for detailed viewing
- **Multiple Types**: Supports Mermaid diagrams, interactive React components, SVG diagrams, and more

### 🔍 Advanced Filtering
- **Search**: Find visualizations by title, description, or sample filename
- **Sample Type**: Filter by sample categories (goodQuality, edgeCase, etc.)
- **Effectiveness**: Filter by effectiveness level (very_high, high, medium, low)
- **Recommendation Status**: Show only recommended or non-recommended visualizations
- **Visualization Type**: Filter by core type (MERMAID, INTERACTIVE, etc.)

### 📈 Analytics & Insights
- **Statistics Dashboard**: View aggregate data about visualizations
- **Effectiveness Scoring**: See relative and comparative effectiveness metrics
- **Quality Assessment**: Evaluate recommendation accuracy and generation success

### 📱 Responsive Design
- Mobile-friendly interface
- Accessible (WCAG compliant)
- High contrast ratios for readability

## Quick Start

### 1. Generate Manifest

First, parse all JSON files and create the manifest:

```bash
cd dashboard/scripts
node generate-manifest.js
```

This will:
- Read all JSON files from the gemini output folder
- Extract visualization suggestions
- Generate `manifest.json` with structured data
- Calculate statistics

### 2. Generate Visualizations

Next, create HTML files for all visualizations:

```bash
node generate-visualizations.js
```

This will:
- Read the manifest
- Generate HTML files for each visualization
- Use appropriate templates based on visualization type
- Save files to `dashboard/visualizations/`

### 3. Open Dashboard

Open `dashboard/index.html` in a web browser:

```bash
# Option 1: Double-click index.html in Finder
# Option 2: Use a local server (recommended)
cd dashboard
python3 -m http.server 8000
# Then open http://localhost:8000
```

## Project Structure

```
dashboard/
├── index.html                  # Main dashboard page
├── manifest.json              # Generated data manifest
├── assets/
│   ├── dashboard.css          # Dashboard styles
│   └── dashboard.js           # React-based dashboard logic
├── visualizations/
│   ├── viz-0-0.html          # Individual visualization files
│   ├── viz-0-1.html
│   └── ...
└── scripts/
    ├── generate-manifest.js   # Data parsing script
    └── generate-visualizations.js  # Visualization generator
```

## Visualization Types Supported

### Mermaid Diagrams
- Flowcharts
- Concept maps
- Process diagrams
- Generated from Mermaid syntax

### Interactive Visualizations
- React-based components
- Dynamic controls (sliders, inputs)
- Real-time updates
- Example: Pizza fraction interactive

### Generic/Fallback
- For unsupported types
- Displays prompt and metadata
- Useful for assessment

## Dashboard Usage Guide

### Navigation

1. **Sidebar**: Browse all visualizations
   - Click any card to view details
   - Scroll through paginated results
   - See key metadata at a glance

2. **Detail View**: Examine selected visualization
   - **Visualization Tab**: See the rendered output
   - **Details Tab**: View all metadata and scores
   - **Prompt Tab**: Read the generation prompt
   - **Sample Tab**: See source content context

3. **Filters**: Refine your view
   - Use multiple filters simultaneously
   - Results update in real-time
   - Pagination adjusts automatically

### Assessment Workflow

To assess if the 4eye Edu project will work:

1. **Review Recommendation Accuracy**
   - Filter by "Recommended Only"
   - Check if recommendations align with actual quality
   - Note any false positives/negatives

2. **Evaluate Generation Success**
   - Look for visualizations that didn't generate
   - Test each visualization for functionality
   - Check for errors or missing elements

3. **Analyze Effectiveness Scoring**
   - Compare "very_high" effectiveness visualizations
   - Verify if they truly enhance learning
   - Check consistency across samples

4. **Identify Patterns**
   - Which sample types produce best visualizations?
   - Which visualization types work best?
   - Are there recurring issues?

5. **Technical Validation**
   - Test on multiple browsers
   - Check mobile responsiveness
   - Verify accessibility features
   - Measure load times

## Key Metrics to Track

### Generation Success Rate
- Total visualizations: `{manifest.totalVisualizations}`
- Successfully generated: Count of generated === true
- Success rate: (generated / total) × 100%

### Quality Distribution
- Very High: `{stats.byEffectiveness.very_high}`
- High: `{stats.byEffectiveness.high}`
- Medium: `{stats.byEffectiveness.medium}`
- Low: `{stats.byEffectiveness.low}`

### Recommendation Accuracy
- Recommended: `{stats.byRecommendation.recommended}`
- Not Recommended: `{stats.byRecommendation.notRecommended}`
- Ratio: recommended / total

## Troubleshooting

### Manifest Not Found
**Error**: "Failed to Load Dashboard - Make sure manifest.json exists"

**Solution**: Run `node generate-manifest.js` first

### Visualizations Not Loading
**Issue**: Iframe shows blank or error

**Solutions**:
1. Check browser console for errors
2. Verify HTML file exists at the path
3. Try opening HTML file directly
4. Check for JavaScript errors in generated code

### Filters Not Working
**Issue**: Filtering doesn't update results

**Solutions**:
1. Clear browser cache
2. Check console for JavaScript errors
3. Verify manifest.json is valid JSON
4. Refresh the page

### Performance Issues
**Issue**: Dashboard is slow with many visualizations

**Solutions**:
1. Use filters to reduce result count
2. Lower items per page (edit `itemsPerPage` in dashboard.js)
3. Use pagination to browse smaller chunks
4. Consider implementing virtual scrolling

## Technical Details

### Technologies Used
- **React 18**: UI framework (via CDN)
- **Material-UI**: Component library (via CDN)
- **Mermaid.js**: Diagram generation
- **Vanilla JS**: Visualization templates
- **CSS3**: Styling and animations

### Browser Support
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

### Accessibility Features
- WCAG 2.1 Level AA compliant
- Keyboard navigation support
- Screen reader compatible
- High contrast text (4.5:1 minimum)
- Focus indicators
- Semantic HTML

## Customization

### Change Items Per Page
Edit `dashboard.js`:
```javascript
const itemsPerPage = 25; // Change this number
```

### Modify Color Scheme
Edit `dashboard.css`:
```css
/* Change primary color */
.dashboard-header {
    background: linear-gradient(135deg, #1976d2 0%, #1565c0 100%);
    /* Change these color values */
}
```

### Add New Filter
1. Add filter state to `filters` object in `Dashboard` component
2. Add UI element in `FiltersSection`
3. Add filter logic in `filteredVisualizations` useMemo

## Performance Optimization

### Current Optimizations
- ✅ Lazy iframe loading (only loads when tab is active)
- ✅ Pagination (25 items per page)
- ✅ React memoization (useMemo for filtered results)
- ✅ CSS-based animations (GPU accelerated)

### Future Enhancements
- Virtual scrolling for large datasets
- Service worker for offline access
- Image lazy loading with Intersection Observer
- Code splitting for faster initial load

## Assessment Checklist

Use this checklist to evaluate the 4eye Edu project:

### Data Quality
- [ ] All JSON files parsed successfully
- [ ] No missing required fields
- [ ] Confidence scores are reasonable
- [ ] Tags are relevant and accurate

### Visualization Quality
- [ ] All visualizations render correctly
- [ ] Interactive elements work as expected
- [ ] Mermaid diagrams display properly
- [ ] Mobile responsive on all devices

### AI Recommendation Quality
- [ ] Recommended visualizations are high quality
- [ ] Not-recommended ones are truly lower value
- [ ] Effectiveness scores align with actual effectiveness
- [ ] Comparative values make sense

### Technical Performance
- [ ] Dashboard loads in < 2 seconds
- [ ] Smooth scrolling with 50+ items
- [ ] Iframes don't block main thread
- [ ] No console errors

### Accessibility
- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] Contrast ratios pass WCAG AA
- [ ] Focus indicators visible

## Next Steps

After reviewing the dashboard:

1. **Document Findings**: Note patterns, issues, and insights
2. **Calculate Metrics**: Generate success/quality statistics
3. **Identify Improvements**: List areas for enhancement
4. **Make Decision**: Assess if 4eye Edu is viable
5. **Plan Iteration**: If viable, plan next development phase

## Support

For questions or issues:
1. Check browser console for errors
2. Verify all scripts ran successfully
3. Review this README thoroughly
4. Check generated files exist

## License

This dashboard is part of the 4eye Edu project assessment.
