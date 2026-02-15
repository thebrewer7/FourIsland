(function () {

    const TICK_KEY = "lastGlobalTick";

    function runGameTick() {

        // don't run if importing or paused
        if (typeof isPaused === "function" && isPaused()) return;

        // Fill incubator if space
        if (typeof addEggToIncubator === "function") {
            const eggs = getIncubatorEggs();
            const capacity = 6;

            if (eggs.length < capacity) {
                addEggToIncubator();
            }
        }

        // Add steps to eggs
        if (typeof addStepsToEggSilent === "function") {
            const eggs = getIncubatorEggs();
            for (let i = eggs.length - 1; i >= 0; i--) {
                addStepsToEggSilent(i);
            }
        }

        localStorage.setItem(TICK_KEY, Date.now());
    }

    // run every tick
    setInterval(runGameTick, (typeof getTickInterval === "function"
        ? getTickInterval()
        : 1000));

    // -------- OFFLINE PROGRESS --------
    (function applyOfflineProgress(){

        const last = parseInt(localStorage.getItem(TICK_KEY), 10);
        if (!last) return;

        const now = Date.now();
        const diff = now - last;

        const interval = (typeof getTickInterval === "function"
            ? getTickInterval()
            : 1000);

        const ticks = Math.floor(diff / interval);
        if (ticks <= 0) return;

        for (let t = 0; t < ticks; t++) {
            runGameTick();
        }

    })();
})();
