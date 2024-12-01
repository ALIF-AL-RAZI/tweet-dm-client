import React, { useRef } from 'react';
import { Button, Paper, Typography } from '@mui/material';
import TweetsyConfig from 'TweetsyConfig';

const CodeSnippet = ({ userIdDataValue }) => {
    const codeSnippetRef = useRef(null);
    const BASE_URL = TweetsyConfig.getNodeUrl();

    const code = `
<script src="https://app.hootspy.com/hootspy.min.js"></script>
<script>
  let recordedEvents = [];

  let dataSaved = false;

  const recorder = rrweb.record({
    emit(event) {
      recordedEvents.push(event);
    },
  });

  async function updateData(id) {
    console.log(recordedEvents);

    const data = {
      data: recordedEvents,
      websiteUrl: window.location.href,
      date: new Date().toLocaleDateString("en-GB"),
      userId: '${userIdDataValue}',
      update: true,
      id,
    };

    fetch("${BASE_URL}api/v1/record/create-record", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data);
      });
  }

  setTimeout(() => {
    console.log(recordedEvents);

    const data = {
      data: [...recordedEvents],
      websiteUrl: window.location.href,
      date: new Date().toLocaleDateString("en-GB"),
      userId:'${userIdDataValue}',
      update: false,
    };
    recordedEvents = [];

    fetch("${BASE_URL}api/v1/record/create-record", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data?.data?._id);
        setInterval(() => {
          updateData(data?.data?._id || "");
          // console.log(recordedEvents);
        }, 10000);
      });
  }, 5000);
</script>
`;

    const handleCopyClick = () => {
        if (codeSnippetRef.current) {
            navigator.clipboard
                .writeText(code)
                .then(() => alert('Code copied to clipboard!'))
                .catch(() => alert('Failed to copy code to clipboard!'));
        }
    };

    return (
        <Paper
            variant="outlined"
            style={{
                padding: '8px',
                marginBottom: '16px',
                backgroundColor: '#282c34', // Set the black background color
                color: '#ffffff', // Set the font color to white
                fontFamily: 'monospace', // Set the font family to monospace for a code editor-like feel
                overflowX: 'auto' // Enable horizontal scrolling if needed
            }}
        >
            <Button variant="contained" style={{ marginBottom: '20px' }} color="primary" onClick={handleCopyClick}>
                Copy
            </Button>
            <Typography
                ref={codeSnippetRef}
                variant="body1"
                component="pre"
                style={{
                    margin: 0 // Remove the default margin
                }}
            >
                {code}
            </Typography>
        </Paper>
    );
};

export default CodeSnippet;
