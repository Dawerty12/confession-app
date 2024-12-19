export function applyTheme(color: string) {
    const metaThemeColor = document.querySelector("meta[name='theme-color']");
    if (metaThemeColor) {
        metaThemeColor.setAttribute("content", color);
    } else {
        const newMeta = document.createElement("meta");
        newMeta.name = "theme-color";
        newMeta.content = color;
        document.head.appendChild(newMeta);
    }
}