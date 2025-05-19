import { useEffect, useRef } from "react";

export const useNarration = () => {
	const audios = useRef([]);

	useEffect(() => {
		const ipc = window.electron;
		if (!ipc?.onPlayNarration) {
			console.warn("[useNarration] onPlayNarration not available");
			return;
		}

		console.log("[useNarration] subscribing to play-narration");
		const cleanup = ipc.onPlayNarration((files) => {
			console.log("[useNarration] play-narration files:", files);

			// 1) Stop any currently playing audio
			audios.current.forEach((a) => {
				a.pause();
				a.currentTime = 0;
			});

			// 2) Build new Audio objects with correct URLs
			//    Using Vite’s import.meta.url to resolve assets under src/assets
			const newAudios = files.map((filename) => {
				const url = new URL(`../assets/narrations/${filename}`, import.meta.url)
					.href;
				console.log("[useNarration] resolved audio URL:", url);
				return new Audio(url);
			});

			// 3) Wire them up in sequence
			newAudios.forEach((audio, idx) => {
				if (idx > 0) {
					newAudios[idx - 1].addEventListener("ended", () => {
						console.log(
							`[useNarration] previous ended, playing ${newAudios[idx].src}`
						);
						audio.play();
					});
				}
			});

			audios.current = newAudios;

			// 4) Play the first one
			if (audios.current[0]) {
				console.log(
					"[useNarration] playing first audio:",
					audios.current[0].src
				);
				audios.current[0].play();
			}
		});

		return () => {
			console.log("[useNarration] unsubscribing from play-narration");
			if (typeof cleanup === "function") cleanup();
		};
	}, []);
};
