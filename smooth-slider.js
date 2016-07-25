/**
 * This slider requires JQuery
 *
 * 1. Create a div with a collection of slide elements as children
 * 2. Create 'next' and 'previous' buttons with ids 'smoothSliderNext' and 'smoothSliderPrev' respectively
 * 3. Execute smoothSlider() on the div
 * 4. Cash out on an awesome slider $$$
**/

var container; // container is the div that the entire slider resides in. This is the element that .smoothSlider() is called on
var left; // left is a global variable to hold the 'left' css value while calculating proper 'left' value for each image to be in the center of the container
var leftArray = []; // leftArray[] holds the 'left' values for each image, [0] is the first child of container
var carousel; // carousel is the div wrapping all of the images. This is the element that will have the 'left' attribute applied to it
var currentImgIndex = 0; // currentImgIndex is the index of the current image displayed inside of leftArray[]

$.fn.smoothSlider = function() {
	container = this; // set container to the element this function is called on
	left = container.width() / 2; // setting original width to half of the container will make calculations more simple in createLeftArray()
	leftArray = createLeftArray(container); // make leftArray out of children of container

	container.css('overflow-x', 'hidden'); // make container restrict vision of slider elements

	carousel = document.createElement('div'); // carousel is a new element to hold wrap slider elements
	carousel.className = ('carousel'); // give carousel a targetable class

	var children = container.children(); // grab all child elements of container to put them inside of carousel

	if (children.length > 0) { // if the container has children, make the carousel element
		for (var i = 0; i < children.length; i++) { // iterate over all children
			carousel.appendChild(children[i]); // add child as a child node of carousel
		}

		while (container.firstChild) { // while container has > 0 children
			container.removeChild(container.firstChild); // remove first child
		}

		container.append(carousel); // nest carousel inside of container element

		carousel = $('.carousel'); // target .carousel
		// apply css to carousel
		carousel.css('left', leftArray[currentImgIndex]); // set 'left' to center current image
		carousel.css('white-space', 'nowrap');
		carousel.css('transition', '1s');
		carousel.css('position', 'relative');
	} else { // else, we got beef bro
		console.error('Slider: please add children elements to your smoothSlider element');
	}

	var i = 0; // index to know current position in carousel.children()
	carousel.children().each(function() {
		if (i == currentImgIndex) { // if this is the current image, it will be focused on, and should be completely opaque
			$(this).css('opacity', '1');
		} else { // otherwise make it half opacity
			$(this).css('opacity', '.5');
		}

		// add other styles for the iamges
		$(this).css('height', '100%');
		$(this).css('width', 'auto');
		$(this).css('transition', '1s');
		i++; // increase index
	});

	// THESE BELOW SHOULD BE GENERATED RATHER THAN CREATED BY USER
	// set next button on click
	$('#smoothSliderNext').on('click', function() {
		return moveCarousel('next');
	});

	// set prev button on click
	$('#smoothSliderPrev').on('click', function() {
		return moveCarousel('prev');
	});
};

// createLeftArray() will return an array with getLeft() of each child of element parameter
function createLeftArray(element) {
	var returnArray = []; // instantiate array to be returned

	for (var i = 0; i < element.children().length; i++) { //iterate over element's children
		returnArray[i] = getLeft(element, i); // getLeft() for each child element
	}

	return returnArray;
}

// getLeft() will return the value of 'left' for carousel element to make carousel.children()[index] (nth child of carousel, n = index) be the center of the container
function getLeft(element, index) {
	var current = element.children()[index]; // current child is [index] of carousel children

	if (index == 0) { // if this is the first image, the "previous" image was taken care of as 'container.width / 2' in main function
		left -= (current.clientWidth + 3.75) / 2; // subtract half of the image from 'left', to put its center in the middle of the container
	} else {
		var prev = element.children()[index - 1]; // prev is image before the currently focused one
		left -= ((prev.clientWidth + 3.75) / 2) + ((current.clientWidth + 3.75) / 2); // subtract half of the previous image, and half of the current image from 'left' to center current image
	}

	return left;
}

// this funciton increases/decreases currentImgIndex, and applies proper 'left' to move carousel forward or backward
function moveCarousel(direction) {
	if (direction == 'next') { // if next button was clicked
		if (currentImgIndex + 1 == leftArray.length) { // if moving forward will go past the length of carousel children
			currentImgIndex = -1; // set currentImgIndex to beginning of array and carousel children (-1 because 1 must be added in the next line)
		}
		currentImgIndex++; // increase currentImgIndex to go to the next image
		carousel.css('left', leftArray[currentImgIndex]); // set 'left' to value to center proper image
	} else if (direction == 'prev') { // if prev button was clicked
		if (currentImgIndex - 1 < 0) { // if moving backward will index -1 (not an index)
			currentImgIndex = leftArray.length; // set currentImgIndex to end of array and carousel children
		}
		currentImgIndex--; // decrease currentImgIndex to got to previous image
		carousel.css('left', leftArray[currentImgIndex]); // set 'left' to value to center proper image
	} else { // else, you fucked up
		console.error('Slider: moveCarousel() accepts "next" or "prev" parameters');
	}

	var i = 0; // index to keep track of current carousel child loop is on
	carousel.children().each(function() {
		i++; // increase index
		if (i == currentImgIndex + 1) { // if this child is the center image RN, make it opaque
			$(this).css('opacity', '1');
		} else { // all others are set to half opacitiy
			$(this).css('opacity', '.5');
		}
	});
}

// when window is resized, reinstantiate leftArray, and reapply proper 'left' value
window.addEventListener('resize', function() {
	waitForFinalEvent(function() { // wait until user is done resizing
		left = container.width() / 2; // set left to half of container width to make calculations in createLeftArray() easier
		leftArray = createLeftArray(carousel); // make leftArray out of children of carousel
		carousel.css('left', leftArray[currentImgIndex]); // set 'left' to center current image
	}, 1200, 'resize'); // wait 1200 sec after final resize to execute above code
});

// this function creates setTimeout functions for n number of functions
var waitForFinalEvent = (function () {
	var timers = {};
	return function (callback, ms, uniqueId) {
		if (!uniqueId) {
			uniqueId = "Don't call this twice without a uniqueId";
		}
		if (timers[uniqueId]) {
			clearTimeout (timers[uniqueId]);
		}
		timers[uniqueId] = setTimeout(callback, ms);
	};
})();