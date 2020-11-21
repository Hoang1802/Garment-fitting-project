/*price range*/

 $('#sl2').slider();

	var RGBChange = function() {
	  $('#RGB').css('background', 'rgb('+r.getValue()+','+g.getValue()+','+b.getValue()+')')
	};	
		
/*scroll to top*/

$(document).ready(function(){
	$(function () {
		$.scrollUp({
	        scrollName: 'scrollUp', // Element ID
	        scrollDistance: 300, // Distance from top/bottom before showing element (px)
	        scrollFrom: 'top', // 'top' or 'bottom'
	        scrollSpeed: 300, // Speed back to top (ms)
	        easingType: 'linear', // Scroll to top easing (see http://easings.net/)
	        animation: 'fade', // Fade, slide, none
	        animationSpeed: 200, // Animation in speed (ms)
	        scrollTrigger: false, // Set a custom triggering element. Can be an HTML string or jQuery object
					//scrollTarget: false, // Set a custom target element for scrolling to the top
	        scrollText: '<i class="fa fa-angle-up"></i>', // Text for element, can contain HTML
	        scrollTitle: false, // Set a custom <a> title if required.
	        scrollImg: false, // Set true to use image
	        activeOverlay: false, // Set CSS color to display scrollUp active point, e.g '#00FFFF'
	        zIndex: 2147483647 // Z-Index for the overlay
		});
	});
	
	function readFile() {
  
		if (this.files && this.files[0]) {
		  
		  var FR= new FileReader();
		  
		  FR.addEventListener("load", function(e) {
			document.getElementById("img").src       = e.target.result;
			document.getElementById("b64").innerHTML = e.target.result;
		  }); 
		  
		  FR.readAsDataURL( this.files[0] );
		}
		
	  }
	  
	var addEventGen = function() {
		var singleProducts = $(".single-products");
		singleProducts.each((index, elem) => {
			let singleProduct = $(elem);
			let buttonSubmit = singleProduct.find(".get-new-image");
			let alert = singleProduct.siblings(".product-overlay").children("h2");
			let imageUrl = singleProduct.find(".main-image").attr("src");
			let apiExtImage = "http://localhost:8000/files";

			buttonSubmit.on("click", function(){
				let input = singleProduct.find(".item-input");
				let Image2Exist = input.val() !== "";
				if(Image2Exist){
					let FR= new FileReader();
					var img64 = "";
					FR.addEventListener("load", function(e) {
						 img64 = e.target.result;
						 $.ajax({
							type: 'POST',
							url: apiExtImage,
							data: JSON.stringify({
								image64: img64,
								imageUrl: imageUrl
							}),
							processData: false,
							cache:false,
							success: function (imageLink){
								let extImage = singleProduct.find(".ext-image");
								extImage.attr('src', imageLink);
								alert.show();
							}
						});
					});
					FR.readAsDataURL( input.prop("files")[0] );
					alert.hide();
				}
			});
		});
	}

	var folder = "images/clothes_garment/";
	let item = $(".item-wrapper");
	for (let index = 1; index < 200; index++) {
		let clone = item.clone();
		let filename = folder + `${index}.jpg`;
		let cloneImage = clone.find(".main-image");
		$(cloneImage).attr('src', filename);
		clone.removeClass("hidden");
		$(".features_items").append(clone);
	}
	$("img").error(function() {
		$(this).parents('.item-wrapper').hide();
	});
	addEventGen();
});
