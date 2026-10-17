const playlist = [
    { title: "Lo-Fi Chill Beat", artist: "DeskOS Sound" },
    { title: "Cyberpunk Synthwave", artist: "Neo Tokyo" },
    { title: "Ambient Workspace", artist: "Productivity Inc" }
];

export function initMusicPlayerContent(container) {
    let currentIndex = 0;
    let isPlaying = false;

    function render() {
        const currentSong = playlist[currentIndex];

        container.innerHTML = `
            <div class="music-player-container">
                <div class="music-album-art">🎵</div>
                <div class="music-info">
                    <div class="music-title">${currentSong.title}</div>
                    <div class="music-artist">${currentSong.artist}</div>
                </div>
                <div class="music-controls">
                    <button class="music-btn" id="prev-btn" title="Anterior">⏮</button>
                    <button class="music-btn play-pause" id="play-btn" title="${isPlaying ? 'Pausa' : 'Reproducir'}">${isPlaying ? '⏸' : '▶'}</button>
                    <button class="music-btn" id="next-btn" title="Siguiente">⏭</button>
                </div>
                <div class="music-playlist">
                    ${playlist.map((song, index) => `
                        <div class="music-playlist-item ${index === currentIndex ? 'active' : ''}" data-index="${index}">
                            ${song.title} - <span style="color: var(--text-secondary);">${song.artist}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        container.querySelector("#play-btn").addEventListener("click", () => {
            isPlaying = !isPlaying;
            render();
        });

        container.querySelector("#next-btn").addEventListener("click", () => {
            currentIndex = (currentIndex + 1) % playlist.length;
            isPlaying = true;
            render();
        });

        container.querySelector("#prev-btn").addEventListener("click", () => {
            currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
            isPlaying = true;
            render();
        });

        container.querySelectorAll(".music-playlist-item").forEach(item => {
            item.addEventListener("click", () => {
                currentIndex = parseInt(item.getAttribute("data-index"));
                isPlaying = true;
                render();
            });
        });
    }

    render();
}