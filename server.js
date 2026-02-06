const express = require('express');
const cors = require('cors');
const ogs = require('open-graph-scraper');

const app = express();
app.use(cors()); // Чтобы фронтенд мог достучаться
app.use(express.json());

app.post('/get-metadata', async (req, res) => {
    const { url } = req.body;

    if (!url) return res.status(400).json({ error: 'URL is required' });

    try {
        const { result } = await ogs({ url });

        res.json({
            title: result.ogTitle || result.twitterTitle || '',
            description: result.ogDescription || '',
            image: result.ogImage?.[0]?.url || '',
            url: url
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to parse' });
    }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));