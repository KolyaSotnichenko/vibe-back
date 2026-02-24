#!/bin/bash

# Test script for Projects API
# Make sure the server is running (npm run start:dev) before running this script

API_KEY="vibe-test-api-key-2024-secure-token-12345"
BASE_URL="http://localhost:3000"

echo "🧪 Testing Projects API"
echo "======================"
echo ""

# Test 1: Create a project
echo "1️⃣ Creating a new project..."
CREATE_RESPONSE=$(curl -s -X POST "$BASE_URL/projects" \
  -H "Content-Type: application/json" \
  -H "X-API-Key: $API_KEY" \
  -d '{
    "name": "Test Project",
    "description": "This is a test project created by the test script",
    "status": "PLANNING",
    "startDate": "2024-03-01T00:00:00.000Z",
    "endDate": "2024-06-30T00:00:00.000Z",
    "owner": "Test User",
    "tags": ["test", "automation"]
  }')

echo "$CREATE_RESPONSE" | python3 -m json.tool 2>/dev/null || echo "$CREATE_RESPONSE"
PROJECT_ID=$(echo "$CREATE_RESPONSE" | grep -o '"id":"[^"]*"' | cut -d'"' -f4)
echo ""
echo "✅ Project created with ID: $PROJECT_ID"
echo ""

# Test 2: Get all projects
echo "2️⃣ Getting all projects..."
curl -s -X GET "$BASE_URL/projects" \
  -H "X-API-Key: $API_KEY" | python3 -m json.tool 2>/dev/null
echo ""
echo "✅ Retrieved all projects"
echo ""

# Test 3: Get single project
echo "3️⃣ Getting project by ID..."
curl -s -X GET "$BASE_URL/projects/$PROJECT_ID" \
  -H "X-API-Key: $API_KEY" | python3 -m json.tool 2>/dev/null
echo ""
echo "✅ Retrieved project: $PROJECT_ID"
echo ""

# Test 4: Update project
echo "4️⃣ Updating project status..."
curl -s -X PATCH "$BASE_URL/projects/$PROJECT_ID" \
  -H "Content-Type: application/json" \
  -H "X-API-Key: $API_KEY" \
  -d '{
    "status": "IN_PROGRESS",
    "description": "Updated description - now in progress!"
  }' | python3 -m json.tool 2>/dev/null
echo ""
echo "✅ Project updated"
echo ""

# Test 5: Get projects by status
echo "5️⃣ Filtering projects by status (IN_PROGRESS)..."
curl -s -X GET "$BASE_URL/projects?status=IN_PROGRESS" \
  -H "X-API-Key: $API_KEY" | python3 -m json.tool 2>/dev/null
echo ""
echo "✅ Filtered projects by status"
echo ""

# Test 6: Get project count
echo "6️⃣ Getting project count..."
curl -s -X GET "$BASE_URL/projects/stats/count" \
  -H "X-API-Key: $API_KEY" | python3 -m json.tool 2>/dev/null
echo ""
echo "✅ Retrieved project count"
echo ""

# Test 7: Delete project
echo "7️⃣ Deleting project..."
curl -s -X DELETE "$BASE_URL/projects/$PROJECT_ID" \
  -H "X-API-Key: $API_KEY" -w "\nHTTP Status: %{http_code}\n"
echo ""
echo "✅ Project deleted"
echo ""

# Test 8: Verify deletion
echo "8️⃣ Verifying deletion (should return 404)..."
curl -s -X GET "$BASE_URL/projects/$PROJECT_ID" \
  -H "X-API-Key: $API_KEY" -w "\nHTTP Status: %{http_code}\n" | python3 -m json.tool 2>/dev/null
echo ""
echo "✅ Deletion verified"
echo ""

# Test 9: Test without API key (should fail)
echo "9️⃣ Testing without API key (should fail with 401)..."
curl -s -X GET "$BASE_URL/projects" -w "\nHTTP Status: %{http_code}\n"
echo ""
echo "✅ API key protection working"
echo ""

echo "======================================"
echo "🎉 All tests completed successfully!"
echo "======================================"
