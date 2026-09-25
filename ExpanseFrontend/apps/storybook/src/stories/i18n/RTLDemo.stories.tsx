import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  TextField,
  Card,
  CardContent,
  CardActions,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Chip,
  Stack,
  IconButton,
  Avatar,
  Badge,
} from "@mui/material"
import {
  Home as HomeIcon,
  Settings as SettingsIcon,
  Person as PersonIcon,
  Mail as MailIcon,
  Notifications as NotificationsIcon,
  ArrowForward as ArrowForwardIcon,
  ArrowBack as ArrowBackIcon,
  Menu as MenuIcon,
  Search as SearchIcon,
  ChevronRight as ChevronRightIcon,
  Star as StarIcon,
} from "@mui/icons-material"
import { useI18n } from "../../i18n"

/**
 * RTL (Right-to-Left) Demo
 *
 * This story demonstrates how components render in RTL mode.
 * Use the Direction toolbar control to switch between LTR and RTL.
 * Selecting Arabic (ar-SA) locale will automatically enable RTL.
 *
 * ## Key RTL Considerations
 *
 * 1. **Text Alignment** - Text flows from right to left
 * 2. **Icon Positioning** - Icons should flip (e.g., arrows, navigation)
 * 3. **Layout Direction** - Flexbox and Grid automatically reverse
 * 4. **Margins/Padding** - Start/end should be used instead of left/right
 * 5. **Bidirectional Text** - Numbers and LTR text within RTL content
 */
function RTLDemo() {
  const i18n = useI18n()
  const isRTL = i18n.direction === "rtl"

  // Sample data in different languages
  const arabicSample = {
    greeting: "مرحباً بالعالم",
    description: "هذا مثال على النص العربي الذي يُقرأ من اليمين إلى اليسار",
    name: "محمد أحمد",
    email: "mohamed@example.com",
    actions: ["حفظ", "إلغاء", "تعديل"],
  }

  const hebrewSample = {
    greeting: "שלום עולם",
    description: "זוהי דוגמה לטקסט עברי שנקרא מימין לשמאל",
    name: "ישראל ישראלי",
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        RTL Layout Demo
      </Typography>

      <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
        <Chip
          label={`Direction: ${i18n.direction.toUpperCase()}`}
          color={isRTL ? "secondary" : "primary"}
        />
        <Chip label={`Locale: ${i18n.locale}`} variant="outlined" />
        <Chip label={i18n.localeConfig.flag} />
      </Stack>

      <Grid container spacing={3}>
        {/* Navigation Example */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Navigation Menu
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <List>
              <ListItem>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText
                  primary={isRTL ? "الصفحة الرئيسية" : "Home"}
                  secondary={isRTL ? "العودة إلى الصفحة الرئيسية" : "Go to homepage"}
                />
                <ChevronRightIcon
                  sx={{
                    // Icon should flip in RTL
                    transform: isRTL ? "scaleX(-1)" : "none",
                  }}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText
                  primary={isRTL ? "الملف الشخصي" : "Profile"}
                  secondary={isRTL ? "إدارة حسابك" : "Manage your account"}
                />
                <ChevronRightIcon
                  sx={{ transform: isRTL ? "scaleX(-1)" : "none" }}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText
                  primary={isRTL ? "الإعدادات" : "Settings"}
                  secondary={isRTL ? "تخصيص تجربتك" : "Customize your experience"}
                />
                <ChevronRightIcon
                  sx={{ transform: isRTL ? "scaleX(-1)" : "none" }}
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>

        {/* Form Example */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              {isRTL ? "نموذج الاتصال" : "Contact Form"}
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Stack spacing={2}>
              <TextField
                label={isRTL ? "الاسم الكامل" : "Full Name"}
                placeholder={isRTL ? arabicSample.name : "John Doe"}
                fullWidth
              />
              <TextField
                label={isRTL ? "البريد الإلكتروني" : "Email"}
                placeholder={arabicSample.email}
                fullWidth
              />
              <TextField
                label={isRTL ? "الرسالة" : "Message"}
                placeholder={
                  isRTL
                    ? "اكتب رسالتك هنا..."
                    : "Write your message here..."
                }
                multiline
                rows={3}
                fullWidth
              />
              <Stack direction="row" spacing={2} justifyContent="flex-end">
                <Button variant="outlined">
                  {isRTL ? "إلغاء" : "Cancel"}
                </Button>
                <Button variant="contained">
                  {isRTL ? "إرسال" : "Submit"}
                </Button>
              </Stack>
            </Stack>
          </Paper>
        </Grid>

        {/* Card Example */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                <Avatar sx={{ bgcolor: "primary.main" }}>
                  {isRTL ? "م" : "J"}
                </Avatar>
                <Box>
                  <Typography variant="h6">
                    {isRTL ? arabicSample.name : "John Doe"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {isRTL ? "مطور برمجيات" : "Software Developer"}
                  </Typography>
                </Box>
              </Stack>
              <Typography variant="body1">
                {isRTL
                  ? arabicSample.description
                  : "This is an example of a user profile card with proper RTL/LTR layout handling."}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                endIcon={
                  <ArrowForwardIcon
                    sx={{ transform: isRTL ? "scaleX(-1)" : "none" }}
                  />
                }
              >
                {isRTL ? "عرض الملف الشخصي" : "View Profile"}
              </Button>
            </CardActions>
          </Card>
        </Grid>

        {/* Toolbar/Header Example */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              {isRTL ? "شريط الأدوات" : "Toolbar Example"}
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Paper
              elevation={2}
              sx={{
                p: 1,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <IconButton>
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" sx={{ flexGrow: 1 }}>
                {isRTL ? "التطبيق" : "App Name"}
              </Typography>
              <IconButton>
                <SearchIcon />
              </IconButton>
              <IconButton>
                <Badge badgeContent={4} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton>
                <Badge badgeContent={2} color="primary">
                  <MailIcon />
                </Badge>
              </IconButton>
              <Avatar sx={{ width: 32, height: 32 }}>
                {isRTL ? "م" : "J"}
              </Avatar>
            </Paper>
          </Paper>
        </Grid>

        {/* Mixed Content (Bidirectional) */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              {isRTL ? "محتوى ثنائي الاتجاه" : "Bidirectional Content"}
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Typography variant="body1" paragraph>
              {isRTL
                ? `النص العربي مع أرقام إنجليزية مثل ${i18n.formatNumber(12345)} والبريد الإلكتروني: user@example.com`
                : `English text with formatted numbers like ${i18n.formatNumber(12345)} and email: user@example.com`}
            </Typography>

            <Typography variant="body1" paragraph>
              {isRTL
                ? `السعر: ${i18n.formatCurrency(1499.99)} | التاريخ: ${i18n.formatDate(new Date())}`
                : `Price: ${i18n.formatCurrency(1499.99)} | Date: ${i18n.formatDate(new Date())}`}
            </Typography>

            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              <Chip icon={<StarIcon />} label={isRTL ? "مميز" : "Featured"} />
              <Chip label={isRTL ? "جديد" : "New"} color="primary" />
              <Chip label={isRTL ? "خصم 20%" : "20% Off"} color="success" />
              <Chip label="v2.0.0" variant="outlined" />
            </Stack>
          </Paper>
        </Grid>

        {/* Arabic Sample Text */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Arabic Sample
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography
              variant="h5"
              dir="rtl"
              lang="ar"
              sx={{ fontFamily: "inherit", mb: 1 }}
            >
              {arabicSample.greeting}
            </Typography>
            <Typography
              variant="body1"
              dir="rtl"
              lang="ar"
              sx={{ fontFamily: "inherit" }}
            >
              {arabicSample.description}
            </Typography>
          </Paper>
        </Grid>

        {/* Hebrew Sample Text */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Hebrew Sample
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography
              variant="h5"
              dir="rtl"
              lang="he"
              sx={{ fontFamily: "inherit", mb: 1 }}
            >
              {hebrewSample.greeting}
            </Typography>
            <Typography
              variant="body1"
              dir="rtl"
              lang="he"
              sx={{ fontFamily: "inherit" }}
            >
              {hebrewSample.description}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

const meta: Meta<typeof RTLDemo> = {
  title: "Internationalization/RTL Demo",
  component: RTLDemo,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
Demonstrates Right-to-Left (RTL) layout support. 

**How to test RTL:**
1. Use the **Direction** toolbar (🔄) to switch between Auto/LTR/RTL
2. Select **Arabic (🇸🇦 العربية)** from the Locale toolbar to auto-enable RTL
3. Check that icons, text, and layouts properly mirror

**RTL Best Practices:**
- Use \`start\`/\`end\` instead of \`left\`/\`right\` in CSS
- Use logical properties: \`margin-inline-start\` instead of \`margin-left\`
- Flip directional icons (arrows, chevrons) using \`transform: scaleX(-1)\`
- MUI components handle most RTL automatically with Emotion RTL plugin
        `,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof RTLDemo>

export const Default: Story = {}

export const ArabicRTL: Story = {
  parameters: {
    docs: {
      description: {
        story: "Force RTL mode to preview Arabic-style layout direction.",
      },
    },
  },
  globals: {
    direction: "rtl",
    locale: "ar-SA",
  },
}

export const ForcedLTR: Story = {
  parameters: {
    docs: {
      description: {
        story: "Force LTR mode even when Arabic locale is selected.",
      },
    },
  },
  globals: {
    direction: "ltr",
    locale: "ar-SA",
  },
}
