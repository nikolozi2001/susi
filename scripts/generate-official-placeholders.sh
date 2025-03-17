#!/bin/bash

# Create the officials directory if it doesn't exist
mkdir -p public/assets/images/officials

# List of officials
OFFICIALS=(
  "liluashvili"
  "batiashvili"
  "pitskhelauri"
  "nikoleishvili"
  "akhobadze"
)

# Create a generic placeholder image
if [ ! -f "public/assets/images/officials/placeholder.jpg" ]; then
  echo "Creating generic placeholder image"
  convert -size 600x800 xc:lightgray \
    -gravity center \
    -pointsize 60 \
    -annotate 0 "Photo\nPlaceholder" \
    "public/assets/images/officials/placeholder.jpg"
fi

# Create placeholder images for each official if they don't exist
for official in "${OFFICIALS[@]}"; do
  if [ ! -f "public/assets/images/officials/${official}.jpg" ]; then
    echo "Creating placeholder for: ${official}"
    convert -size 600x800 xc:lightgray \
      -gravity center \
      -pointsize 60 \
      -annotate 0 "${official}" \
      "public/assets/images/officials/${official}.jpg"
  fi
done

echo "Done creating official placeholder images"
