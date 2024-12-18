#!/bin/bash
set -e

# Define source and destination directories
# Clone the GitHub repository
REPO_URL="https://github.com/your-username/your-repo.git"
TEMP_DIR=$(mktemp -d)
echo "Cloning repository from $REPO_URL to $TEMP_DIR..."
git clone "$REPO_URL" "$TEMP_DIR"

# Define source and destination directories
SRC_DIR="$TEMP_DIR/php/"
DEST_DIR="/var/www/html/"

# Copy all files from the source directory to the destination directory
echo "Copying files from $SRC_DIR to $DEST_DIR..."
cp -r "$SRC_DIR"* "$DEST_DIR"

# Make all files in the destination directory executable
echo "Setting executable permissions for files in $DEST_DIR..."
chmod -R +x "$DEST_DIR"

# Add www-data user to sudoers file with no password for user 'lg'
SUDOERS_FILE="/etc/sudoers"
SUDOERS_ENTRY="www-data ALL=(lg) NOPASSWD: ALL"
if ! grep -qF "$SUDOERS_ENTRY" "$SUDOERS_FILE"; then
    echo "Adding www-data to sudoers file..."
    echo "$SUDOERS_ENTRY" >> "$SUDOERS_FILE"
else
    echo "www-data is already in the sudoers file."
fi

echo "Installation complete. :-)"
echo "press enter to reboot"
read
reboot