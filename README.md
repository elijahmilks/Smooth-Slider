# Smooth-Slider
A JS slider built on JQuery

1. Create an element to hold the slider
2. Any direct children of this element will be a slide. (div, img, iframe)
3. Create 'next' and 'previous' buttons with ids 'smoothSliderNext' and 'smoothSliderPrev' respectively (generated buttons coming soon)
4. Execute .smoothSlider() on your slider holder
5. Cash out on an epic slider $$$

## Options
Options can be passed to smoothSlider() as such:

```
$('#target').smoothSlider({
  autoSlide: 1
});
```

* autoSlide: takes 'x' (> .5), and will slide every 'x' seconds
* more coming soon
