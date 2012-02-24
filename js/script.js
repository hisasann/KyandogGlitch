var illusts = [
		"illust-1.jpeg",
		"illust-2.jpeg",
		"illust-3.jpeg",
		"illust-4.jpeg",
		"illust-5.jpeg",
		"illust-6.jpeg",
		"illust-7.jpeg",
		"illust-8.jpeg",
		"illust-9.jpeg",
		"illust-10.jpeg",
		"illust-11.jpeg",
		"illust-12.jpeg",
		"illust-13.jpeg",
		"illust-14.jpeg"
	],
	image_wrapper = $("#image_wrapper"),
	loading = $("#loading"),
	isLoaded = false;

$(function() {
	var array = arrayShuffle(illusts);
	
	var image;
	$.each(array, function(index, data) {
		$.ajax({
			type: "GET",
			url: "illust/" + data,
			cache: false,
			beforeSend: function(xhr){
				xhr.overrideMimeType("text/plain; charset=x-user-defined");
			},
			success: function(data, textStatus){
			},
			complete: function(xhr, textStatus) {
				if (!isLoaded) {
					loading.hide();
				}
				isLoaded = true;
				
				var type = xhr.getResponseHeader("Content-Type");

				var _index = index,
					clazz;
				if (_index % 2 == 0) {
					// 偶数の処理
					clazz = "transformLeft";
				} else {
					// 奇数の処理
					clazz = "transformRight";
				}
					
				image = $("<img/>")
					.attr({
						"src": [
							'data:',
							type,
							';base64,',
							base64encode(xhr.responseText.replace(/0/g, Math.floor(Math.random() * 10))),
						].join(''),
						"class": clazz
					});

				image_wrapper.append(image);
			},
			error: function(xhr, textStatus, errorThrown){
			}
		});
	});
});

function arrayShuffle(list) {
    var i = list.length;

    while (--i) {
        var j = Math.floor(Math.random() * (i + 1));
        if (i == j) continue;
        var k = list[i];
        list[i] = list[j];
        list[j] = k;
    }
    return list;
}

// [via] http://userscripts.org/scripts/review/9653
function base64encode(data) {
	return btoa(data.replace(/[\u0100-\uffff]/g, function(c) {
		return String.fromCharCode(c.charCodeAt(0) & 0xff);
	}));
}
