/**
 * Acquisition Timeline Component
 * Displays K-12, Higher Ed, and Team acquisition timelines
 */
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import SchoolIcon from '@mui/icons-material/School'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import GroupsIcon from '@mui/icons-material/Groups'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

import { 
  userAcquisitionK12, 
  userAcquisitionHigherEd, 
  teamAcquisition 
} from '../../data/expanseEdu'


const COLORS = {
  primary: '#3B82F6',
  secondary: '#8B5CF6',
  success: '#10B981',
  warning: '#F59E0B',
}

export function AcquisitionTimeline() {
  return (
    <Box>
      <Grid container spacing={3}>
        {/* K-12 Acquisition */}
        <Grid item xs={12} lg={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <SchoolIcon sx={{ color: COLORS.primary }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  K-12 User Acquisition
                </Typography>
              </Box>

              <Chip 
                label={userAcquisitionK12.accuracyLevel}
                size="small"
                color="warning"
                sx={{ mb: 2 }}
              />

              <Typography variant="subtitle2" sx={{ mb: 1, color: COLORS.primary }}>Goals:</Typography>
              <List dense sx={{ mb: 2 }}>
                {userAcquisitionK12.goals.map((goal, idx) => (
                  <ListItem key={idx} sx={{ py: 0.25 }}>
                    <ListItemIcon sx={{ minWidth: 28 }}>
                      <CheckCircleIcon sx={{ fontSize: 16, color: COLORS.success }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary={goal} 
                      primaryTypographyProps={{ variant: 'body2' }}
                    />
                  </ListItem>
                ))}
              </List>

              <Typography variant="subtitle2" sx={{ mb: 1, color: COLORS.secondary }}>
                Membership Timeline:
              </Typography>
              <Stepper orientation="vertical" sx={{ mb: 2 }}>
                <Step active>
                  <StepLabel>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>Earliest</Typography>
                  </StepLabel>
                  <StepContent>
                    <Typography variant="body2" color="text.secondary">
                      {userAcquisitionK12.membershipTimeline.earliest}
                    </Typography>
                  </StepContent>
                </Step>
                <Step active>
                  <StepLabel>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>Expected</Typography>
                  </StepLabel>
                  <StepContent>
                    <Typography variant="body2" color="text.secondary">
                      {userAcquisitionK12.membershipTimeline.expected}
                    </Typography>
                  </StepContent>
                </Step>
                <Step active>
                  <StepLabel>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>Latest</Typography>
                  </StepLabel>
                  <StepContent>
                    <Typography variant="body2" color="text.secondary">
                      {userAcquisitionK12.membershipTimeline.latest}
                    </Typography>
                  </StepContent>
                </Step>
              </Stepper>

              <Typography variant="subtitle2" sx={{ mb: 1 }}>Key Variables:</Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                <Chip label={`${userAcquisitionK12.variables.studentsPerSchool} students/school`} size="small" variant="outlined" />
                <Chip label={`${userAcquisitionK12.variables.schoolsPerDistrict} schools/district`} size="small" variant="outlined" />
                <Chip label={`${userAcquisitionK12.variables.studentsPerClassroom} students/classroom`} size="small" variant="outlined" />
                <Chip label={`${userAcquisitionK12.variables.classesPerDayTeacher} classes/teacher/day`} size="small" variant="outlined" />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Higher Ed Acquisition */}
        <Grid item xs={12} lg={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <AccountBalanceIcon sx={{ color: COLORS.secondary }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Higher Education Categories
                </Typography>
              </Box>

              <TableContainer component={Paper} variant="outlined">
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ bgcolor: 'background.default' }}>
                      <TableCell>Category</TableCell>
                      <TableCell>Students/School</TableCell>
                      <TableCell>Schools/Uni</TableCell>
                      <TableCell>Lecture Size</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {userAcquisitionHigherEd.institutionCategories.map((cat) => (
                      <TableRow key={cat.name}>
                        <TableCell>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {cat.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {cat.description.substring(0, 50)}...
                          </Typography>
                        </TableCell>
                        <TableCell>
                          {cat.studentsPerSchool.min.toLocaleString()}-{cat.studentsPerSchool.max.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          {cat.schoolsPerUniversity.min}-{cat.schoolsPerUniversity.max}
                        </TableCell>
                        <TableCell>
                          {cat.classroomSizes.introLecture.min}-{cat.classroomSizes.introLecture.max}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Team Acquisition */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                <GroupsIcon sx={{ color: COLORS.success }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Team Acquisition Timeline
                </Typography>
              </Box>

              <Grid container spacing={3}>
                {teamAcquisition.phases.map((phase, idx) => (
                  <Grid item xs={12} md={4} key={phase.name}>
                    <Paper 
                      variant="outlined" 
                      sx={{ 
                        p: 2,
                        height: '100%',
                        borderColor: idx === 0 ? COLORS.primary : idx === 1 ? COLORS.warning : COLORS.success,
                        borderWidth: 2,
                      }}
                    >
                      <Typography 
                        variant="subtitle1" 
                        sx={{ 
                          fontWeight: 700, 
                          mb: 2,
                          color: idx === 0 ? COLORS.primary : idx === 1 ? COLORS.warning : COLORS.success,
                        }}
                      >
                        Phase {idx + 1}: {phase.name}
                      </Typography>
                      <List dense>
                        {phase.roles.map((role, roleIdx) => (
                          <ListItem key={roleIdx} sx={{ py: 0.25, px: 0 }}>
                            <ListItemIcon sx={{ minWidth: 24 }}>
                              <Box 
                                sx={{ 
                                  width: 6, 
                                  height: 6, 
                                  borderRadius: '50%', 
                                  bgcolor: idx === 0 ? COLORS.primary : idx === 1 ? COLORS.warning : COLORS.success,
                                }} 
                              />
                            </ListItemIcon>
                            <ListItemText 
                              primary={role} 
                              primaryTypographyProps={{ variant: 'body2' }}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}
