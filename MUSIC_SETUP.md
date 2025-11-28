# Music Setup Instructions

## To enable background music:

You need to provide an audio file since YouTube URLs cannot be used directly in HTML5 audio elements.

### Option 1: Use a local audio file
1. Download the audio from: https://youtu.be/prpcyShbLBU?si=suPvnAiBUgMNL_-L
2. Convert to MP3 format
3. Save as `theme.mp3` in the root folder
4. Update the audio source in `index.html`

### Option 2: Use a hosted audio file
1. Upload your audio file to a hosting service (Google Drive, Dropbox, etc.)
2. Get a direct download link
3. Update the `src` attribute in the `<audio>` tag in `index.html`

### Current Implementation:
The code is ready but needs a valid audio file URL or local file path.
