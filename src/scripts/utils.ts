export function getPrevLink(currentIndex: number, totalItems: number) {
    const index = getPrevIndex(currentIndex, totalItems);
    return window.location.href.replace(/\?image=*/, `?image=${index}`);
}

export function getNextLink(currentIndex: number, totalItems: number) {
    const index = getNextIndex(currentIndex, totalItems);
    return window.location.href.replace(/\?image=*/, `?image=${index}`);
}

export function getPrevIndex(currentIndex: number, totalItems: number) {
    let index = currentIndex;
    if (currentIndex - 1 < 0) {
        index = totalItems - 1;
    } else {
        index = currentIndex - 1;
    }
    return index;
}

export function getNextIndex(currentIndex: number, totalItems: number) {
    let index = currentIndex;
    if (currentIndex + 1 > totalItems - 1) {
        index = 0;
    } else {
        index = currentIndex + 1;
    }
    return index;
}

export function loadImages(
    currentIndex: number,
    imagesElements: HTMLImageElement[],
) {
    const indexes = [
        getPrevIndex(currentIndex, imagesElements.length),
        getNextIndex(currentIndex, imagesElements.length),
    ];
    loadImage(imagesElements[currentIndex]);

    for (const index of indexes) {
        loadImage(imagesElements[index]);
    }
}

export function loadImage(image: HTMLImageElement) {
    image.loading = "eager";
}