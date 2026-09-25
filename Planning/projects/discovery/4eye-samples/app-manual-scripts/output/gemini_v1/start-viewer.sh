#!/bin/bash
# Quick script to start the viewer server correctly

echo "🔍 Gemini Output Viewer - Server Startup Script"
echo "================================================"

# Set the correct directory
VIEWER_DIR="/Users/mm/Projects/Planning/projects/businesses/4eye/4eye_projects/samples/app-manual-scripts/output/gemini"

# Kill any existing server on port 8000
echo "📡 Checking for existing server on port 8000..."
lsof -ti:8000 | xargs kill -9 2>/dev/null && echo "   ✅ Killed existing server" || echo "   ℹ️  No existing server found"

# Change to the viewer directory
cd "$VIEWER_DIR" || {
    echo "❌ Error: Could not change to viewer directory"
    echo "   Directory: $VIEWER_DIR"
    exit 1
}

# Verify viewer.html exists
if [ ! -f "viewer.html" ]; then
    echo "❌ Error: viewer.html not found in current directory"
    pwd
    exit 1
fi

echo "✅ Found viewer.html in: $(pwd)"

# Start the server
echo "🚀 Starting HTTP server on port 8000..."
python3 -m http.server 8000 > /dev/null 2>&1 &
SERVER_PID=$!

# Wait a moment for server to start
sleep 1

# Test if server is running
if curl -s -I http://localhost:8000/viewer.html | grep -q "200 OK"; then
    echo "✅ Server is running successfully!"
    echo ""
    echo "📊 Access the viewer at: http://localhost:8000/viewer.html"
    echo "🔧 Server PID: $SERVER_PID"
    echo ""
    echo "To stop the server, run: kill $SERVER_PID"
    echo ""
    
    # Open in browser
    echo "🌐 Opening in browser..."
    open http://localhost:8000/viewer.html
else
    echo "❌ Error: Server started but not responding correctly"
    kill $SERVER_PID 2>/dev/null
    exit 1
fi
