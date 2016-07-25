/**
 * This slider requires JQuery
 *
 * 1. Create a div with a collection of slide elements as children
 * 2. Create 'next' and 'previous' buttons with ids 'smoothSliderNext' and 'smoothSliderPrev' respectively
 * 3. Execute smoothSlider() on the div
 * 4. Cash out on an awesome slider $$$
**/

var container;
var left;
var imgArray = [];
var carousel;
var currentImgIndex = 0;

$.fn.smoothSlider = function() {
	container = this;
	left = container.width() / 2;
	imgArray = createImgArray(container);

	container.css('overflow-x', 'hidden');

	carousel = document.createElement('div');
	carousel.className = ('carousel');

	var children = container.children();

	if (children.length > 0) {
		for (var i = 0; i < children.length; i++) {
			carousel.appendChild(children[i]);
		}

		while (container.firstChild) {
			container.removeChild(container.firstChild);
		}

		container.append(carousel);

		carousel = $('.carousel');
		carousel.css('left', imgArray[currentImgIndex]);
		carousel.css('white-space', 'nowrap');
		carousel.css('transition', '1s');
		carousel.css('position', 'relative');
	} else {
		console.error('Slider: please add children elements to your smoothSlider element');
	}

	var i = 0;
	carousel.children().each(function() {
		if (i == 0) {
			$(this).css('opacity', '1');
		} else {
			$(this).css('opacity', '.5');
		}
		$(this).css('height', '100%');
		$(this).css('width', 'auto');
		$(this).css('transition', '1s');
		i++;
	});

	$('#smoothSliderNext').on('click', function() {
		return moveCarousel('next');
	});

	$('#smoothSliderPrev').on('click', function() {
		return moveCarousel('prev');
	});
};

function createImgArray(element) {
	var returnArray = [];

	for (var i = 0; i < element.children().length; i++) {
		returnArray[i] = getLeft(element, i);
		console.log(returnArray[i]);
	}

	return returnArray;
}

function getLeft(element, index) {
	var current = element.children()[index];

	if (index == 0) {
		left -= (current.clientWidth + 3.75) / 2;
	} else {
		var prev = element.children()[index - 1];
		left -= ((prev.clientWidth + 3.75) / 2) + ((current.clientWidth + 3.75) / 2);
	}

	return left;
}

function moveCarousel(direction) {
	if (direction == 'next') {
		if (currentImgIndex + 1 == imgArray.length) {
			currentImgIndex = -1;
		}
		carousel.css('left', imgArray[currentImgIndex + 1]);
		currentImgIndex++;
	} else if (direction == 'prev') {
		if (currentImgIndex - 1 < 0) {
			currentImgIndex = imgArray.length;
		}
		carousel.css('left', imgArray[currentImgIndex - 1]);
		currentImgIndex--;
	} else {
		console.error('Slider: moveCarousel() accepts "next" or "prev" parameters');
	}
	var i = 0;
	carousel.children().each(function() {
		i++;
		if (i == currentImgIndex + 1) {
			$(this).css('opacity', '1');
		} else {
			$(this).css('opacity', '.5');
		}
	});
}

window.addEventListener('resize', function() {
	waitForFinalEvent(function() {
		currentChildIndex = 0;
		left = $(window).width() / 2;
		imgArray = createImgArray(carousel);
		carousel.css('left', imgArray[currentImgIndex]);
		console.log(imgArray);
	}, 1200, 'resize');
});

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