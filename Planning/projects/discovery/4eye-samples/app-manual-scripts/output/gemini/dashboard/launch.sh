#!/bin/bash

# Dashboard Test & Launch Script

echo "🧪 4eye Edu Dashboard - Test & Launch"
echo "======================================"
echo ""

# Check if files exist
echo "📋 Checking required files..."

DASHBOARD_DIR="/Users/mm/Projects/Planning/projects/businesses/4eye/4eye_projects/samples/app-manual-scripts/output/gemini/dashboard"

if [ ! -f "$DASHBOARD_DIR/manifest.json" ]; then
    echo "❌ manifest.json not found!"
    echo "   Run: node scripts/generate-manifest.js"
    exit 1
fi

if [ ! -f "$DASHBOARD_DIR/index.html" ]; then
    echo "❌ index.html not found!"
    exit 1
fi

VIZ_COUNT=$(find "$DASHBOARD_DIR/visualizations" -name "*.html" 2>/dev/null | wc -l | tr -d ' ')
echo "✅ Found $VIZ_COUNT visualization files"

# Parse manifest stats
if command -v jq &> /dev/null; then
    TOTAL_VIZ=$(jq '.totalVisualizations' "$DASHBOARD_DIR/manifest.json")
    RECOMMENDED=$(jq '.statistics.byRecommendation.recommended' "$DASHBOARD_DIR/manifest.json")
    echo "✅ Manifest loaded: $TOTAL_VIZ total visualizations, $RECOMMENDED recommended"
else
    echo "✅ Manifest exists (install jq for detailed stats)"
fi

echo ""
echo "🚀 Starting local server..."
echo ""
echo "Dashboard URL: http://localhost:8000"
echo "Press Ctrl+C to stop the server"
echo ""

cd "$DASHBOARD_DIR"
python3 -m http.server 8000
