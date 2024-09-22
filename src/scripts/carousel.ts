// @ts-ignore
// TODO: a11yDialog types
import A11yDialog from "https://cdn.jsdelivr.net/npm/a11y-dialog@8/dist/a11y-dialog.esm.min.js";
import { getNextIndex, getNextLink, getPrevIndex, getPrevLink, loadImage, loadImages } from "./utils";

export class Carousel {
  dialog: any | null = null;
  carouselElem: HTMLElement | null = null;
  slidesUl: HTMLUListElement | HTMLElement | null = null;
  imagesElements: HTMLImageElement[] = [];
  prevLink: HTMLAnchorElement | null = null;
  nextLink: HTMLAnchorElement | null = null;
  closeButton: HTMLButtonElement | null = null;
  currentIdx: number | null = null;
  isOpen: boolean = false;

  _popstateHandler = (e: PopStateEvent) => { };
  _keydownHandler = (e: KeyboardEvent) => { };
  _hoverPrevHandler = (e: MouseEvent) => { };
  _hoverNextHandler = (e: MouseEvent) => { };
  _goToPrevHandler = (e: MouseEvent) => { };
  _goToNextHandler = (e: MouseEvent) => { };
  _closeHandler = (e: MouseEvent) => { };
  _updateSlideHandler = (e: any) => { };

  constructor(carouselElem: HTMLElement | null) {
    if (carouselElem == null) return;
    const slides = carouselElem.querySelector<HTMLUListElement>("#slides");
    const prevLink =
      carouselElem.querySelector<HTMLAnchorElement>("#prevLink");
    const nextLink =
      carouselElem.querySelector<HTMLAnchorElement>("#nextLink");
    const closeButton =
      carouselElem.querySelector<HTMLButtonElement>("#closeButton");

    if (
      slides == null ||
      prevLink == null ||
      nextLink == null ||
      closeButton == null
    )
      return;

    this.dialog = new A11yDialog(document.getElementById("carousel-dialog"));
    this.carouselElem = carouselElem;
    this.slidesUl = slides;
    this.prevLink = prevLink;
    this.nextLink = nextLink;
    this.closeButton = closeButton;

    const { currentIndex, isOpen } = this._getCarouselState();
    this.currentIdx = currentIndex;
    this.isOpen = isOpen;

    this.slidesUl.children[this.currentIdx]?.classList.add(
      "carousel__slide--visible"
    );

    this.imagesElements = Array.from(this.slidesUl.children).reduce<
      HTMLImageElement[]
    >((acc, c) => {
      const imgElement = c.querySelector("picture img");
      if (imgElement instanceof HTMLImageElement) {
        acc.push(imgElement);
      }
      return acc;
    }, []);

    if (this.isOpen) {
      this.open(this.currentIdx);
    }

    this._popstateHandler = this._handlePopstate.bind(this);
    addEventListener("popstate", this._popstateHandler);
  }

  open(index: number | undefined = undefined) {
    if (index == null || Number.isNaN(index)) return;
    document.documentElement.style.overflow = "hidden";
    this.carouselElem!.classList.add("carousel--active");
    this.isOpen = true;
    this._addEvents();
    this._updateCarouselUrl(index);
    this.dialog.show();
  }

  close() {
    document.documentElement.style.overflow = "auto";
    this.carouselElem!.classList.remove("carousel--active");
    this.isOpen = false;
    this._updateCarouselUrl();
    this._removeEvents();
    this.dialog.hide();
  }

  private _changeCurrentSlide(oldIdx: number, newIdx: number) {
    if (newIdx > this.slidesUl!.childElementCount) {
      this.close();
      return;
    }

    this.slidesUl!.children[newIdx]?.classList.add(
      "carousel__slide--visible"
    );

    if (newIdx !== oldIdx) {
      this.slidesUl!.children[oldIdx]?.classList.remove(
        "carousel__slide--visible"
      );
    }

    this.currentIdx = newIdx;

    if (this.isOpen) {
      loadImages(this.currentIdx, this.imagesElements);
    }

    this.prevLink!.href = getPrevLink(
      this.currentIdx,
      this.slidesUl!.childElementCount
    );
    this.nextLink!.href = getNextLink(
      this.currentIdx,
      this.slidesUl!.childElementCount
    );
  }

  private _addEvents() {
    this._keydownHandler = this._handleKeydown.bind(this);
    this._hoverPrevHandler = this._hoverPrev.bind(this);
    this._hoverNextHandler = this._hoverNext.bind(this);
    this._goToPrevHandler = this._handleGoToPrev.bind(this);
    this._goToNextHandler = this._handleGoToNext.bind(this);
    this._closeHandler = this._handleClose.bind(this);
    this._updateSlideHandler = this._handleUpdateSlide.bind(this);

    this.dialog.on("hide", this._closeHandler);

    this.prevLink!.addEventListener("click", this._goToPrevHandler);
    this.prevLink!.addEventListener("mouserenter", this._hoverPrev);
    this.nextLink!.addEventListener("click", this._goToNextHandler);
    this.nextLink!.addEventListener("mouserenter", this._hoverNext);
    this.closeButton!.addEventListener("click", this._closeHandler);

    document.addEventListener("keydown", this._keydownHandler);
  }

  private _removeEvents() {
    this.prevLink!.removeEventListener("click", this._goToPrevHandler);
    this.prevLink!.removeEventListener("mouserenter", this._hoverPrev);
    this.nextLink!.removeEventListener("click", this._goToNextHandler);
    this.nextLink!.removeEventListener("mouserenter", this._hoverNext);
    this.closeButton!.removeEventListener("click", this._closeHandler);

    document.removeEventListener("keydown", this._keydownHandler);

    this.dialog.off("hide", this._closeHandler);
  }

  // Handles back/forward events
  private _handlePopstate(this: Carousel, e: PopStateEvent) {
    if (e.state?.imageIndex == null) {
      // Close carousel when going back/forward to an non-carousel url
      if (this.isOpen) {
        this.close();
      }
    } else {
      if (this.isOpen) {
        this._changeCurrentSlide(this.currentIdx, e.state?.imageIndex);
      } else {
        this.open(e.state.imageIndex);
      }
    }
  }

  private _handleKeydown(this: Carousel, e: KeyboardEvent) {
    if (e.key == "ArrowLeft") {
      this._handleGoToPrev(e);
    }
    if (e.key == "ArrowRight") {
      this._handleGoToNext(e);
    }
    if (e.key == "Escape") {
      this._handleClose(e);
    }
  }

  private _hoverPrev(this: Carousel, e: MouseEvent) {
    const index = getPrevIndex(
      this.currentIdx,
      this.slidesUl?.childElementCount ?? 0
    );
    loadImage(this.imagesElements[index]);
  }
  private _hoverNext(this: Carousel, e: MouseEvent) {
    const index = getNextIndex(
      this.currentIdx,
      this.slidesUl?.childElementCount ?? 0
    );
    loadImage(this.imagesElements[index]);
  }

  private _handleGoToPrev(this: Carousel, e: MouseEvent | KeyboardEvent) {
    e.preventDefault();
    const index = getPrevIndex(
      this.currentIdx,
      this.slidesUl?.childElementCount ?? 0
    );
    this._updateCarouselUrl(index);
  }

  private _handleGoToNext(this: Carousel, e: MouseEvent | KeyboardEvent) {
    e.preventDefault();
    const index = getNextIndex(
      this.currentIdx,
      this.slidesUl?.childElementCount ?? 0
    );
    this._updateCarouselUrl(index);
  }

  private _handleClose(this: Carousel, e: MouseEvent | KeyboardEvent) {
    this.close();
  }

  private _handleUpdateSlide(this: Carousel, e: any) {
    const { currentIndex, isOpen } = this._getCarouselState();
    if (isOpen) {
      this._changeCurrentSlide(this.currentIdx, currentIndex);
    }
  }

  private _getCarouselState() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    const currentIndex = Number(params.image ?? 0);
    const isOpen = Boolean(params.image);
    return { currentIndex, isOpen };
  }

  private _updateCarouselUrl(newIndex: number | undefined = undefined) {
    const url = new URL(window.location.href);
    if (newIndex == null) {
      url.searchParams.delete("image");
      if (history.state?.imageIndex == null) {
        // Avoids adding the same non-carousel url to history
        history.replaceState(null, "", url);
      } else {
        // Adds new history entry each time the carousel is open
        history.pushState(null, "", url);
      }
    } else {
      url.searchParams.set("image", String(newIndex));
      if (history.state?.imageIndex == null) {
        // Adds new history entry each time the carousel is open
        history.pushState({ imageIndex: newIndex }, "", url);
      } else {
        // Avoids adding each image change to history
        history.replaceState({ imageIndex: newIndex }, "", url);
      }
    }
    this._changeCurrentSlide(this.currentIdx, newIndex);
  }
}
