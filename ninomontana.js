(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"ninomontana_atlas_1", frames: [[180,1681,296,91],[1655,1603,313,91],[1655,1696,296,91],[1974,0,65,74],[180,1403,248,276],[614,642,446,446],[1974,304,35,28],[2025,105,20,3],[2011,304,28,22],[1974,137,59,24],[1974,282,49,20],[1974,355,43,17],[1974,76,58,27],[1974,409,47,8],[1974,334,50,19],[1974,163,52,27],[1974,374,38,19],[1974,192,43,31],[2012,252,36,24],[1974,252,36,28],[2019,202,25,5],[1974,105,49,30],[2019,192,24,8],[1974,395,39,12],[1974,225,43,25],[180,1359,118,37],[1280,1373,120,36],[320,642,292,759],[0,642,318,715],[1757,762,262,680],[1418,1309,235,660],[614,1090,281,620],[1418,762,337,545],[897,1090,208,512],[0,1359,178,461],[1107,1373,171,431],[430,1403,151,160],[1418,611,183,133],[1655,1444,191,157],[1848,1444,159,133],[1671,0,301,760],[1115,611,301,760],[0,0,1113,640],[1115,0,554,609]]}
];


(lib.AnMovieClip = function(){
	this.actionFrames = [];
	this.currentSoundStreamInMovieclip;
	this.soundStreamDuration = new Map();
	this.streamSoundSymbolsList = [];

	this.gotoAndPlayForStreamSoundSync = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.gotoAndPlay = function(positionOrLabel){
		this.clearAllSoundStreams();
		var pos = this.timeline.resolve(positionOrLabel);
		if (pos != null) { this.startStreamSoundsForTargetedFrame(pos); }
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(this.currentFrame);
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
		this.clearAllSoundStreams();
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
		this.clearAllSoundStreams();
	}
	this.startStreamSoundsForTargetedFrame = function(targetFrame){
		for(var index=0; index<this.streamSoundSymbolsList.length; index++){
			if(index <= targetFrame && this.streamSoundSymbolsList[index] != undefined){
				for(var i=0; i<this.streamSoundSymbolsList[index].length; i++){
					var sound = this.streamSoundSymbolsList[index][i];
					if(sound.endFrame > targetFrame){
						var targetPosition = Math.abs((((targetFrame - sound.startFrame)/lib.properties.fps) * 1000));
						var instance = playSound(sound.id);
						var remainingLoop = 0;
						if(sound.offset){
							targetPosition = targetPosition + sound.offset;
						}
						else if(sound.loop > 1){
							var loop = targetPosition /instance.duration;
							remainingLoop = Math.floor(sound.loop - loop);
							if(targetPosition == 0){ remainingLoop -= 1; }
							targetPosition = targetPosition % instance.duration;
						}
						instance.loop = remainingLoop;
						instance.position = Math.round(targetPosition);
						this.InsertIntoSoundStreamData(instance, sound.startFrame, sound.endFrame, sound.loop , sound.offset);
					}
				}
			}
		}
	}
	this.InsertIntoSoundStreamData = function(soundInstance, startIndex, endIndex, loopValue, offsetValue){ 
 		this.soundStreamDuration.set({instance:soundInstance}, {start: startIndex, end:endIndex, loop:loopValue, offset:offsetValue});
	}
	this.clearAllSoundStreams = function(){
		this.soundStreamDuration.forEach(function(value,key){
			key.instance.stop();
		});
 		this.soundStreamDuration.clear();
		this.currentSoundStreamInMovieclip = undefined;
	}
	this.stopSoundStreams = function(currentFrame){
		if(this.soundStreamDuration.size > 0){
			var _this = this;
			this.soundStreamDuration.forEach(function(value,key,arr){
				if((value.end) == currentFrame){
					key.instance.stop();
					if(_this.currentSoundStreamInMovieclip == key) { _this.currentSoundStreamInMovieclip = undefined; }
					arr.delete(key);
				}
			});
		}
	}

	this.computeCurrentSoundStreamInstance = function(currentFrame){
		if(this.currentSoundStreamInMovieclip == undefined){
			var _this = this;
			if(this.soundStreamDuration.size > 0){
				var maxDuration = 0;
				this.soundStreamDuration.forEach(function(value,key){
					if(value.end > maxDuration){
						maxDuration = value.end;
						_this.currentSoundStreamInMovieclip = key;
					}
				});
			}
		}
	}
	this.getDesiredFrame = function(currentFrame, calculatedDesiredFrame){
		for(var frameIndex in this.actionFrames){
			if((frameIndex > currentFrame) && (frameIndex < calculatedDesiredFrame)){
				return frameIndex;
			}
		}
		return calculatedDesiredFrame;
	}

	this.syncStreamSounds = function(){
		this.stopSoundStreams(this.currentFrame);
		this.computeCurrentSoundStreamInstance(this.currentFrame);
		if(this.currentSoundStreamInMovieclip != undefined){
			var soundInstance = this.currentSoundStreamInMovieclip.instance;
			if(soundInstance.position != 0){
				var soundValue = this.soundStreamDuration.get(this.currentSoundStreamInMovieclip);
				var soundPosition = (soundValue.offset?(soundInstance.position - soundValue.offset): soundInstance.position);
				var calculatedDesiredFrame = (soundValue.start)+((soundPosition/1000) * lib.properties.fps);
				if(soundValue.loop > 1){
					calculatedDesiredFrame +=(((((soundValue.loop - soundInstance.loop -1)*soundInstance.duration)) / 1000) * lib.properties.fps);
				}
				calculatedDesiredFrame = Math.floor(calculatedDesiredFrame);
				var deltaFrame = calculatedDesiredFrame - this.currentFrame;
				if(deltaFrame >= 2){
					this.gotoAndPlayForStreamSoundSync(this.getDesiredFrame(this.currentFrame,calculatedDesiredFrame));
				}
			}
		}
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.CachedBmp_43 = function() {
	this.initialize(ss["ninomontana_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_42 = function() {
	this.initialize(ss["ninomontana_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_41 = function() {
	this.initialize(ss["ninomontana_atlas_1"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_192 = function() {
	this.initialize(ss["ninomontana_atlas_1"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_39 = function() {
	this.initialize(ss["ninomontana_atlas_1"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_191 = function() {
	this.initialize(ss["ninomontana_atlas_1"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_190 = function() {
	this.initialize(ss["ninomontana_atlas_1"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_36 = function() {
	this.initialize(ss["ninomontana_atlas_1"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_189 = function() {
	this.initialize(ss["ninomontana_atlas_1"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_34 = function() {
	this.initialize(ss["ninomontana_atlas_1"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_188 = function() {
	this.initialize(ss["ninomontana_atlas_1"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_187 = function() {
	this.initialize(ss["ninomontana_atlas_1"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_186 = function() {
	this.initialize(ss["ninomontana_atlas_1"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_185 = function() {
	this.initialize(ss["ninomontana_atlas_1"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_184 = function() {
	this.initialize(ss["ninomontana_atlas_1"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_183 = function() {
	this.initialize(ss["ninomontana_atlas_1"]);
	this.gotoAndStop(15);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_182 = function() {
	this.initialize(ss["ninomontana_atlas_1"]);
	this.gotoAndStop(16);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_181 = function() {
	this.initialize(ss["ninomontana_atlas_1"]);
	this.gotoAndStop(17);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_180 = function() {
	this.initialize(ss["ninomontana_atlas_1"]);
	this.gotoAndStop(18);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_179 = function() {
	this.initialize(ss["ninomontana_atlas_1"]);
	this.gotoAndStop(19);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_23 = function() {
	this.initialize(ss["ninomontana_atlas_1"]);
	this.gotoAndStop(20);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_178 = function() {
	this.initialize(ss["ninomontana_atlas_1"]);
	this.gotoAndStop(21);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_21 = function() {
	this.initialize(ss["ninomontana_atlas_1"]);
	this.gotoAndStop(22);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_177 = function() {
	this.initialize(ss["ninomontana_atlas_1"]);
	this.gotoAndStop(23);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_19 = function() {
	this.initialize(ss["ninomontana_atlas_1"]);
	this.gotoAndStop(24);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_176 = function() {
	this.initialize(ss["ninomontana_atlas_1"]);
	this.gotoAndStop(25);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_175 = function() {
	this.initialize(ss["ninomontana_atlas_1"]);
	this.gotoAndStop(26);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_16 = function() {
	this.initialize(ss["ninomontana_atlas_1"]);
	this.gotoAndStop(27);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_15 = function() {
	this.initialize(ss["ninomontana_atlas_1"]);
	this.gotoAndStop(28);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_14 = function() {
	this.initialize(ss["ninomontana_atlas_1"]);
	this.gotoAndStop(29);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_13 = function() {
	this.initialize(ss["ninomontana_atlas_1"]);
	this.gotoAndStop(30);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_12 = function() {
	this.initialize(ss["ninomontana_atlas_1"]);
	this.gotoAndStop(31);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_11 = function() {
	this.initialize(ss["ninomontana_atlas_1"]);
	this.gotoAndStop(32);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_10 = function() {
	this.initialize(ss["ninomontana_atlas_1"]);
	this.gotoAndStop(33);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_9 = function() {
	this.initialize(ss["ninomontana_atlas_1"]);
	this.gotoAndStop(34);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_8 = function() {
	this.initialize(ss["ninomontana_atlas_1"]);
	this.gotoAndStop(35);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_174 = function() {
	this.initialize(ss["ninomontana_atlas_1"]);
	this.gotoAndStop(36);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_7 = function() {
	this.initialize(ss["ninomontana_atlas_1"]);
	this.gotoAndStop(37);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_6 = function() {
	this.initialize(ss["ninomontana_atlas_1"]);
	this.gotoAndStop(38);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_5 = function() {
	this.initialize(ss["ninomontana_atlas_1"]);
	this.gotoAndStop(39);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_173 = function() {
	this.initialize(ss["ninomontana_atlas_1"]);
	this.gotoAndStop(40);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2 = function() {
	this.initialize(ss["ninomontana_atlas_1"]);
	this.gotoAndStop(41);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1 = function() {
	this.initialize(ss["ninomontana_atlas_1"]);
	this.gotoAndStop(42);
}).prototype = p = new cjs.Sprite();



(lib.Group_0 = function() {
	this.initialize(ss["ninomontana_atlas_1"]);
	this.gotoAndStop(43);
}).prototype = p = new cjs.Sprite();
// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop, this.reversed));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.Símbolo2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// flash0_ai
	this.instance = new lib.CachedBmp_175();
	this.instance.setTransform(0,0,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_176();
	this.instance_1.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},15).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,60,18.5);


(lib.Símbolo1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// flash0_ai
	this.instance = new lib.CachedBmp_8();
	this.instance.setTransform(0,0,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_9();
	this.instance_1.setTransform(-2.3,-6.05,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_10();
	this.instance_2.setTransform(-6.85,-22.9,0.5,0.5);

	this.instance_3 = new lib.CachedBmp_11();
	this.instance_3.setTransform(-40.65,-35.1,0.5,0.5);

	this.instance_4 = new lib.CachedBmp_12();
	this.instance_4.setTransform(-27.7,-47.7,0.5,0.5);

	this.instance_5 = new lib.CachedBmp_13();
	this.instance_5.setTransform(-19.55,-59.05,0.5,0.5);

	this.instance_6 = new lib.CachedBmp_14();
	this.instance_6.setTransform(-28.85,-59.9,0.5,0.5);

	this.instance_7 = new lib.CachedBmp_15();
	this.instance_7.setTransform(-38.9,-71.95,0.5,0.5);

	this.instance_8 = new lib.CachedBmp_16();
	this.instance_8.setTransform(-34.35,-83.95,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},2).to({state:[{t:this.instance_2}]},2).to({state:[{t:this.instance_3}]},2).to({state:[{t:this.instance_4}]},2).to({state:[{t:this.instance_5}]},2).to({state:[{t:this.instance_6}]},2).to({state:[{t:this.instance_7}]},2).to({state:[{t:this.instance_8}]},2).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-40.6,-83.9,168.5,379.5);


(lib.Path_16 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#BC1E1E").s().p("AF8D3QhkhQhBANQgvAJgPAiQgSAogUAKQgTAJgGgIQgFgFgCgUQgGgugagDQgdgEgbA+QgdBCgSADQgTADgRg+QgUhHgagRQgwgdhiAMQhyAOhOBCQg1AugmBnQhzhrhxiqQhWiDhQigIAhguQBQhlB1hAQCvgFB/gyICOg5QD+gMEuBDQDqA0CqBJQCuBLBrBXQgpC0g8CMQhJCphbBWQgwAug+AmQhYikhzhbg");
	this.shape.setTransform(95.8,50.2339);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_16, new cjs.Rectangle(0,0,191.6,100.5), null);


(lib.Path_13 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,0,0);


(lib.Path_12 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#E4F0F4").s().p("AgbCmQgPhrglgIQgugKhCAMQhEAMgRAXQgOATgIBBQgDAfgCAaQABgVgGgZQgOg3glgVQgegQiuAYQh0AQiiAfQgWgngfhZIgFgPQgUg3gOguQEQAYC4hKIDDhMQBpglBYgNQDYgfEoBjQDsBPCIgFQBkgDAngxQgMBSgfBHQgMAZgIAQQghBAgrBAQhdgtizgkQiPgdgvAAQgXAAgMAuQgJAggCAtQABgxgHgkQgKg1gZgIQgvgQhYAMQhjAOgMArQgKAngGBTQgDAnAAAfQgBgxgHgzg");
	this.shape.setTransform(93.425,26.6838);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_12, new cjs.Rectangle(0,0.1,186.9,53.3), null);


(lib.Path_11 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#AF592E").s().p("AulAoQEQAYC4hIIDDhNQBpglBYgMQDYggEoBkQDsBOCIgFQBkgEAngvQgMBQgfBHQkUgqjagZQkxgiiOAGQicAHkaAvQi/AgjcAtQgUg5gOgug");
	this.shape.setTransform(93.425,14.3213);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_11, new cjs.Rectangle(0,0.1,186.9,28.5), null);


(lib.Path_9 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFB3BC").s().p("AA0CTQj9gIjdh5QgkgTgfgXQBIg8A+gUQBcgeBZAOQAoAGBgAhQAmANBegtQBegtArAQQA6AWBKA2QBYBAAnA/Qi4BWjbAAIgjAAg");
	this.shape.setTransform(49.025,14.7931);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_9, new cjs.Rectangle(0,0.1,98.1,29.4), null);


(lib.Path_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#E2915A").s().p("AhqgDQhQgYgjgEIG7AAQgjAMhgAaIhZAZQgzgSg5gRg");
	this.shape.setTransform(24.425,3.275);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_1, new cjs.Rectangle(2.2,0.1,44.5,6.4), null);


(lib.Path_11_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFB3BC").s().p("AmLC2QjRg5h1g5QBrhZBWg+QCBhbA3gGQAlgEA4ASIBnAqQCKA4BHgYQBZgeEfBYQBuAiBVAiQBVAkAEANQAGAVmKAnQmGAnkoAAIgqAAg");
	this.shape_1.setTransform(72.1545,18.1994);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_11_1, new cjs.Rectangle(0,0,144.3,36.4), null);


(lib.Path_7 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#E4F0F4").s().p("AgWEvIgYg/IgRA7IgEgBIgKhAQgHg4gMg8QgXh2gYgOQgggThCgIQhHgJgcARQgXAPACBTQABBPgEAAQgEgBgMgqQgOgzgegdQgmgjkNBLQgag0gLhEQDLjYE6gaQCdgNB0AeQH4AnDzD7QgWAjgXAXQgcAbg2AjQgUgygIgQQgQghgOgGQgegMhPgJQhTgIgcAKQgZAJgVBlQgKAzgHAxQADg1gDg3QgEhtgUgNQgdgShUgCQhbgDgeAdQgZAWAACCQAABMAHBag");
	this.shape.setTransform(76.9,30.5035);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_7, new cjs.Rectangle(0,-0.1,153.8,61.2), null);


(lib.Path_6 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#AF592E").s().p("AKwCFQijhrjMhLQjYhSjQgbQjkgei2ApQjyA1itCwQAdg4AjgwQDDkTFfgrQCvgVCIAhQH3AnDzD8QBMBOAyBoQAtBgATBsQhNhsikhsg");
	this.shape.setTransform(92.875,34.8009);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_6, new cjs.Rectangle(0,-0.1,185.8,69.8), null);


(lib.Path_5 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#E4F0F4").s().p("AgIEaQj1gekAhHQhpgdhdghQiEgvg3gnQgygigWhTQgWhRALhqIAogbIAZAkQAkAwBIA+QBOBCAcACQAZABAdgZQAPgNAJgNIgQBDIAkAkQAuAnA0AUQA0ATA0gtQAZgVAQgaQAIAZgCAwQACgLAFgNQAIgaALgKQAGgGATgCIAAAAIgIAyQgEA5AWAdQAZAhA6AAQA2ABAVgXQAQgQAiABIBSAEQAsAAA/gpQAfgVAXgVIAbAuQAkAvAqAAQAwAABPgcQBLgaAJgOQAFgJDRhuQDWh6Aig+IAAAAIAjgMQAlEbiGB3Qg9A3hvAmQhWAdiiAhQhdATh4AAQhzAAiJgRg");
	this.shape.setTransform(98.1488,29.8632);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_5, new cjs.Rectangle(0,0,196.3,59.8), null);


(lib.Path_20 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#E4F0F4").s().p("AmvBmQgWglglgOQg/gZiaANQC5h0D5gpQB8gUBXADQH4AdEKCgQhZgii1ACQiuAKgTAAQgZgBgYAbIgTAaQgMguhxgKQhXgIg8AMQgbAFgKATQgDAGgBAAIgHgLQgJgUhdAFQhDADg/AMQgfAFgJApQgEAUACATQgEgPgKgTg");
	this.shape.setTransform(70.8,13.6304);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_20, new cjs.Rectangle(0,0,141.6,27.3), null);


(lib.Path_19 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#E4F0F4").s().p("ACNFwQiPgjivADQhDABjTATQiWAMhHgLQhkgRgwhGQhqibgxiJQhIjKAoi5QAwCyBDCOQBpDfB7A8QCMBFClAHQAzACB2ACQB0ADBqAMQCGAPCWgNQClgPCLgvQFYh0BCkDQgLA0gRA9IgdBgQhIDsjUBMQhiAjiBAAQiMAAixgqg");
	this.shape.setTransform(102.6253,41.0165);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_19, new cjs.Rectangle(0,0,205.3,82.1), null);


(lib.Path_18 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,0,0);


(lib.Path_16_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFB3BC").s().p("AEKB1IiQgKQhkgHhMADQjcAIhVgTQhugaAjhSQAQglApgdQBTg6B9AoQBvAjCDgWQBZgPALgBQA6gGAyAJQB0AWAfAhQAfAiggBKQgPAjgqAMQgbAHgvAAIgeAAg");
	this.shape_1.setTransform(44.3569,11.7304);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_16_1, new cjs.Rectangle(0.1,0,88.60000000000001,23.5), null);


(lib.Path_15 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#AF592E").s().p("AtrBGQBZhwB+hPQC5h1D5gpQB8gUBXADQH3AdELChQCwBqBFCkQhIg3g6gnQhTg2jEgoQjIgojqgJQj+gKjaAgQj1AliZBUQimBeh4CFQAmh1BWhug");
	this.shape.setTransform(100.025,29.7304);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_15, new cjs.Rectangle(0,0,200.1,59.5), null);


(lib.Path_14 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#E4F0F4").s().p("AAHABIhQgmQAnAIAoAUQAvAVAVAZQgVgOgugWg");
	this.shape.setTransform(7.375,3.75);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_14, new cjs.Rectangle(0,0,14.8,7.5), null);


(lib.Path_13_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#E4F0F4").s().p("AgCAIQAFgzAIgfQACAigFAqQgHAxgMAYIAJhDg");
	this.shape.setTransform(1.2017,7.525);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_13_1, new cjs.Rectangle(0,0,2.4,15.1), null);


(lib.Path_12_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#E4F0F4").s().p("AgEgYQA2gbAkAXQgkgMgzAaQgiAPgyAnQAigpAvgXg");
	this.shape_1.setTransform(8.575,3.946);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_12_1, new cjs.Rectangle(0,0,17.2,8), null);


(lib.Path_11_2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#E4F0F4").s().p("AgGADQABghAMgZIgFA7QgCAjAHARQgPgPACgmg");
	this.shape_2.setTransform(0.7642,5.625);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_11_2, new cjs.Rectangle(0.1,0,1.4,11.3), null);


(lib.Path_10 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#E4F0F4").s().p("AAAAFQgrgJgfgMQAgADArAJQArAIAfANQgggCgrgKg");
	this.shape.setTransform(7.5,1.65);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_10, new cjs.Rectangle(0,0,15,3.3), null);


(lib.Path_9_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#E4F0F4").s().p("AAYABQhtgRgagGQA2AAA+AKQBRAMAaAXQgWgMhCgKg");
	this.shape_1.setTransform(11.225,2.25);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_9_1, new cjs.Rectangle(0,0,22.5,4.5), null);


(lib.Path_8 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#E4F0F4").s().p("AgKgEQAdgmAfgbQgOAVgsA6QgjArgGAQQAEgcAjgtg");
	this.shape.setTransform(5,6.95);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_8, new cjs.Rectangle(0,0,10,13.9), null);


(lib.Path_7_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#E4F0F4").s().p("AAJgEIhUADQApgOAsACQA1ACANAaQgRgRgygCg");
	this.shape_1.setTransform(7.625,1.4379);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_7_1, new cjs.Rectangle(0,0,15.3,2.9), null);


(lib.Path_6_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#E4F0F4").s().p("AgIAAQARguAUgiQgKAkgWA6QgWA4gDALQgBgbAVg2g");
	this.shape_1.setTransform(2.87,8.125);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_6_1, new cjs.Rectangle(0,0,5.8,16.3), null);


(lib.Path_5_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#E4F0F4").s().p("ABCAdQAEgHgGgLQgJgShHhEIg8g3QAhAWAgAbQBIA8AMAbQAGAPgEAIQAAAtgEA5IgFhmg");
	this.shape_1.setTransform(7.6762,13.125);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_5_1, new cjs.Rectangle(0,0,15.4,26.3), null);


(lib.Path_4 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#E4F0F4").s().p("AiNAbQgBgXAHgKQACgEANgJQCvh9BYA9Qg1gbhGAYQgpAOhJAuQgiAVgEAJQgKAXAQBNQgPgrAAgig");
	this.shape.setTransform(14.2482,10.422);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_4, new cjs.Rectangle(0,0.1,28.5,20.7), null);


(lib.Path_3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#E4F0F4").s().p("An1BvQgLgfiTAMIiRATQAAgOgJgOQgSgcgsAAQglAAjFAVQhJhCiNihQADgbAEgPQCOAMDBA5QE0BdAmAKQHYBzJfhpQHIhQEIhAQBMgTASgCQAXgCArAGQgkAwgvAqQhdAqijAoQiRAjgGAGQgMAKgGAmQgCATgBARQgJgUgggYQgXgSh0ABQhxABgcAQQgUALADAkIABANIgIgQQgNgghtABQhZACg8APQgjAKgLAUIgFASQgOgxhYADQhlALgiABQgqAAgVASIgNARIgJgjQgGgXhpAFQhVAFg0ANQgcAGgPAgIgKAfQgGgggSgzg");
	this.shape.setTransform(132.375,19.4);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_3, new cjs.Rectangle(0,0,264.8,38.8), null);


(lib.Path_13_2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#E4F0F4").s().p("AmnB5QkDh3igjjICoBUQBhAxCHAmQBpAdA7AHQAkAFAggUQAQgKAJgLIgCAVQABAYAPARQAQAVA4AEQA1AFAMgKQANgKATgoIASAOQAbAOAoACIA6AEQAcACBjgCQBLgCA5gTQAxgSBMAFQB1AGDJg1QhcBrh5BAQiZBSjfAdQhgANhcAAQkGAAjjhpg");
	this.shape_1.setTransform(84.325,22.5818);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_13_2, new cjs.Rectangle(0,0,168.7,45.2), null);


(lib.Path_8_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#E4F0F4").s().p("ANBDLQgugJi6ABQijAAgXgOQgigUg+gTQg+gUgfABQgcACgEAlQgDASADASQgQgogKg1QgGgmhfgIQhagIglAZQgUAOgZA4QgXAzgUAGQgKgMACgOIAJhsQgEAKgRA7QgMApgQANQgLgGgDgGIgBgFQAAgZgEgcQgJg5gXgQQgcgThRAAQhRABggAUQgYAPgPAbQgJAQgDANQAGgogGgeQgFgUg8gKIh3gQQg5gIgJA4QgLg5hTgcQhNgbhVANQgahIgJhIQC9AzECAtQIFBZFcgkQFbgiEHhDQCFghBEgcQgUA2ggBHQhBCMhFBnIgaAkIgKABIgHAAg");
	this.shape_1.setTransform(106.2,20.32);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_8_1, new cjs.Rectangle(0,0,212.4,40.7), null);


(lib.Path_7_2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#AF592E").s().p("AJrBxQigghkrgRQi5gJi1gDQlHgHnKAIQgVgqgOgmQgTg3gKgzIgGgnQC9A0ECAsQIFBYFcgiQFbgjEHhCQCFgiBEgcIgNAjQgrBpg2BkQguBWgiAvQh2gtiHgdg");
	this.shape_2.setTransform(106.2,18.675);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_7_2, new cjs.Rectangle(0,0,212.4,37.4), null);


(lib.Path_13_3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,0,0);


(lib.Path_12_2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,0,0);


(lib.Path_11_3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#E4F0F4").s().p("AKMDSIABgEQADgthEg+QgvgrghgRQgJgFgKAkQgFASgDATQgDgtgPgkQgJgXhQgTQg1gOg3gHQgVgCgMAjQgIAWgDAhQABgegIgZQgMgpgggWQgogbg4AEIhGAMQgWAEgMCsQAFiZgagfQgWgahTANQhUATgOACQgRADgBBVQgBAwAEAwQgVirgWgCQgWgCgpAHQgwAIgOAPQgMAOgKA6QgFAdgDAbIAAhVQgFgNgUgNQgogYhLAJQhfAMiuCPQAbgvAegoQBChUBvhKQB1hPBcgOIAIgBQA4gHBDASIB5AkQCrApDwhaQBpgoCZBbQBtBCB2B5QA4A6AvA8QApA0AQAeQhuAVg4AAQg+AAAEgag");
	this.shape_3.setTransform(87.625,23.6486);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_11_3, new cjs.Rectangle(0,0,175.3,47.3), null);


(lib.Path_10_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,0,0);


(lib.Path_9_2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#E4F0F4").s().p("AqBC9QgjgOgsgZQhYgzgtg7QBNhbBAhEQB4h/AlAAIABAAQgZBAgSBHQgkCMAjAfQAiAeBDgBQAiAAAbgGIBTjcQgNAuANBNQAKA+AOAdQAQAhAoAaQAnAaA3gDQA2gCABgVQAAgQAKg6IALg+QgCAoACAcQAFA9AWAHQA/ATAkAEQBPAKAsghQAxgmgEiaQANCXARAHQASAJB/gHQCDgHANgOQATgTgShnQAQBLASABQANACAdh9QAOg/AMhAIAWACQAfAKA5AxQA2AtBNBrQhOA5iJA0QkrBxleAVQhKAEhIAAQkEAAjhg6g");
	this.shape_2.setTransform(85.4,24.7212);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_9_2, new cjs.Rectangle(0,0,170.8,49.5), null);


(lib.Path = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#E2915A").s().p("AgeAmQhsgDgugUQgWgKgCgIQgigTBAgIQA1gHBXADQAmABBxgDQBVgDARAFQAMAEgNANQgOANggALQhNAfhlAAIgUAAg");
	this.shape.setTransform(22.0838,3.8882);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path, new cjs.Rectangle(0,0.1,44.2,7.7), null);


(lib.Group = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.instance = new lib.CachedBmp_174();
	this.instance.setTransform(-0.05,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Group, new cjs.Rectangle(0,0,75.5,80), null);


(lib.Group_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.instance_1 = new lib.CachedBmp_7();
	this.instance_1.setTransform(-0.05,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Group_1, new cjs.Rectangle(0,0,91.5,66.5), null);


(lib.Group_2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.instance_2 = new lib.CachedBmp_6();
	this.instance_2.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Group_2, new cjs.Rectangle(0,0,95.5,78.5), null);


(lib.Group_3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.instance_3 = new lib.CachedBmp_5();
	this.instance_3.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Group_3, new cjs.Rectangle(0,0,79.5,66.5), null);


(lib.Path_4_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#BD1E2D").s().p("EgaIA94QsDlHpTpSQpSpTlHsDQlRsfAAtqQAAtpFRsfQFHsDJSpTQJTpSMDlHQMflRNpAAQNqAAMfFRQMDFHJTJSQJSJTFHMDQFRMfAANpQAANqlRMfQlHMDpSJTQpTJSsDFHQsfFRtqAAQtpAAsflRg");
	this.shape_1.setTransform(429.725,429.725);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_4_1, new cjs.Rectangle(0,0,859.5,859.5), null);


(lib.Group_4 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.instance_4 = new lib.Group_0();

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Group_4, new cjs.Rectangle(0,0,554,609), null);


(lib.Símbolo11 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#F05A28").s().p("AiXBFQgJhiBWhIQBFg6BQAHQAoAEAbAPIALBPQgdgKgpABQhTADg+A6QguApgNA+QgGAeACAWQgWgjgEgxg");
	this.shape.setTransform(30.3324,45.562);

	this.instance = new lib.Group();
	this.instance.setTransform(37.85,40,1,1,0,0,0,37.8,40);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#F05A28").s().p("AA2CFQgggFgjgiQgXgWgng0QgZgggUg/IgPg5QAHAYAaArQAcAuAWATQAgAcAZAIQAmANAjgYQAbgTACggIgEgdQAGALAbBZQADAogZAbQgUAVgdAAIgLAAg");
	this.shape_1.setTransform(15.4366,75.2903);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.instance},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,75.5,88.7);


(lib.Símbolo8 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.instance = new lib.Group_2();
	this.instance.setTransform(56.45,50.4,1,1,-15.0007,0,0,47.9,39.4);

	this.instance_1 = new lib.CachedBmp_43();
	this.instance_1.setTransform(-112.8,55.15,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance},{t:this.instance_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-112.8,0.1,225.39999999999998,100.60000000000001);


(lib.Símbolo7 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.instance = new lib.Group_1();
	this.instance.setTransform(44.15,53,1,1,74.9998,0,0,45.9,33.2);

	this.instance_1 = new lib.CachedBmp_42();
	this.instance_1.setTransform(-35.1,-45.5,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance},{t:this.instance_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-35.1,-45.5,156.5,151.1);


(lib.Símbolo6 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.instance = new lib.Group_3();
	this.instance.setTransform(43.45,39.05,0.922,0.922,14.9985,0,0,39.8,33.2);

	this.instance_1 = new lib.CachedBmp_41();
	this.instance_1.setTransform(-122.9,7.7,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance},{t:this.instance_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-122.9,0,209.60000000000002,78.2);


(lib.Símbolo4 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.instance = new lib.CachedBmp_192();
	this.instance.setTransform(168,33.05,0.5,0.5);

	this.instance_1 = new lib.Group_4();
	this.instance_1.setTransform(111.6,104.6,0.2575,0.2575,0,0,0,277.4,305.4);

	this.instance_2 = new lib.CachedBmp_39();
	this.instance_2.setTransform(49.5,35.4,0.5,0.5);

	this.instance_3 = new lib.CachedBmp_191();
	this.instance_3.setTransform(0,0,0.5,0.5);

	this.instance_4 = new lib.Path_4_1();
	this.instance_4.setTransform(111.85,119.65,0.2576,0.2576,0,0,0,429.9,430.2);
	this.instance_4.alpha = 0.3906;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,223,230.3);


(lib.Símbolo3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// flash0_ai
	this.instance = new lib.CachedBmp_23();
	this.instance.setTransform(9,15.6,0.5,0.5);

	this.instance_1 = new lib.Path_1();
	this.instance_1.setTransform(13.65,0.45,0.1041,0.1041,0,0,0,25.9,4.8);
	this.instance_1.alpha = 0.3789;
	this.instance_1.compositeOperation = "multiply";

	this.instance_2 = new lib.CachedBmp_178();
	this.instance_2.setTransform(0,0.8,0.5,0.5);

	this.instance_3 = new lib.Path_9();
	this.instance_3.setTransform(13.3,12.7,0.1041,0.1041,0,0,0,50.5,17.8);
	this.instance_3.alpha = 0.5703;
	this.instance_3.compositeOperation = "overlay";

	this.instance_4 = new lib.CachedBmp_21();
	this.instance_4.setTransform(7.65,10.2,0.5,0.5);

	this.instance_5 = new lib.Path_11();
	this.instance_5.setTransform(13.7,3.1,0.1041,0.1041,0,0,0,95.6,16.4);
	this.instance_5.compositeOperation = "multiply";

	this.instance_6 = new lib.Path_12();
	this.instance_6.setTransform(13.7,4.45,0.1041,0.1041,0,0,0,95.6,29.3);
	this.instance_6.compositeOperation = "multiply";

	this.instance_7 = new lib.Path_13();
	this.instance_7.setTransform(16.7,6.1,0.1041,0.1041,0,0,0,1.9,1.4);
	this.instance_7.compositeOperation = "multiply";

	this.instance_8 = new lib.CachedBmp_177();
	this.instance_8.setTransform(3.85,1.5,0.5,0.5);

	this.instance_9 = new lib.Path_16();
	this.instance_9.setTransform(13.15,7.65,0.1041,0.1041,0,0,0,97.5,52.4);
	this.instance_9.alpha = 0.5703;
	this.instance_9.compositeOperation = "multiply";

	this.instance_10 = new lib.CachedBmp_19();
	this.instance_10.setTransform(1.95,1.5,0.5,0.5);

	this.instance_11 = new lib.CachedBmp_181();
	this.instance_11.setTransform(1.85,1.7,0.5,0.5);

	this.instance_12 = new lib.Path_5();
	this.instance_12.setTransform(12.75,11.55,0.0909,0.0909,0,0,0,98.5,30.2);
	this.instance_12.compositeOperation = "multiply";

	this.instance_13 = new lib.Path_6();
	this.instance_13.setTransform(13.1,5.65,0.0909,0.0909,0,0,0,93,35.2);
	this.instance_13.alpha = 0.5781;
	this.instance_13.compositeOperation = "multiply";

	this.instance_14 = new lib.Path_7();
	this.instance_14.setTransform(12.85,5.25,0.0909,0.0909,0,0,0,77,30.8);
	this.instance_14.compositeOperation = "multiply";

	this.instance_15 = new lib.CachedBmp_180();
	this.instance_15.setTransform(3.8,2.4,0.5,0.5);

	this.instance_16 = new lib.Path_11_1();
	this.instance_16.setTransform(11.7,11.55,0.0909,0.0909,0,0,0,72.6,18.7);
	this.instance_16.alpha = 0.5703;
	this.instance_16.compositeOperation = "overlay";

	this.instance_17 = new lib.CachedBmp_179();
	this.instance_17.setTransform(3.8,1.5,0.5,0.5);

	this.instance_18 = new lib.Path();
	this.instance_18.setTransform(12.75,0.4,0.1033,0.1033,0,0,0,22.8,3.9);
	this.instance_18.alpha = 0.3789;
	this.instance_18.compositeOperation = "multiply";

	this.instance_19 = new lib.CachedBmp_183();
	this.instance_19.setTransform(0,1.05,0.5,0.5);

	this.instance_20 = new lib.Path_9_2();
	this.instance_20.setTransform(12.1,9.4,0.1033,0.1033,0,0,0,86.2,25.7);
	this.instance_20.compositeOperation = "multiply";

	this.instance_21 = new lib.Path_10_1();
	this.instance_21.setTransform(14.05,8.1,0.1033,0.1033,0,0,0,1,1);
	this.instance_21.compositeOperation = "multiply";

	this.instance_22 = new lib.Path_11_3();
	this.instance_22.setTransform(12.65,4.7,0.1033,0.1033,0,0,0,88.1,24.7);
	this.instance_22.compositeOperation = "multiply";

	this.instance_23 = new lib.Path_12_2();
	this.instance_23.setTransform(14.95,5.2,0.1033,0.1033,0,0,0,0.5,0.5);
	this.instance_23.compositeOperation = "multiply";

	this.instance_24 = new lib.Path_13_3();
	this.instance_24.setTransform(12.35,5.7,0.1033,0.1033,0,0,0,1,1);
	this.instance_24.compositeOperation = "multiply";

	this.instance_25 = new lib.CachedBmp_182();
	this.instance_25.setTransform(2.8,2.2,0.5,0.5);

	this.instance_26 = new lib.CachedBmp_186();
	this.instance_26.setTransform(-2.2,0,0.5,0.5);

	this.instance_27 = new lib.Path_7_2();
	this.instance_27.setTransform(12,4.05,0.1173,0.1173,0,0,0,106.6,18.8);
	this.instance_27.alpha = 0.4609;
	this.instance_27.compositeOperation = "multiply";

	this.instance_28 = new lib.Path_8_1();
	this.instance_28.setTransform(12,4.25,0.1173,0.1173,0,0,0,106.6,20.4);
	this.instance_28.compositeOperation = "multiply";

	this.instance_29 = new lib.CachedBmp_185();
	this.instance_29.setTransform(-0.15,3.1,0.5,0.5);

	this.instance_30 = new lib.Path_13_2();
	this.instance_30.setTransform(11.1,8.75,0.1173,0.1173,0,0,0,84.5,22.6);
	this.instance_30.compositeOperation = "multiply";

	this.instance_31 = new lib.CachedBmp_184();
	this.instance_31.setTransform(-0.45,1.85,0.5,0.5);

	this.instance_32 = new lib.CachedBmp_188();
	this.instance_32.setTransform(1.1,1.7,0.5,0.5);

	this.instance_33 = new lib.Path_3();
	this.instance_33.setTransform(13.55,4.95,0.0784,0.0784,0,0,0,133.9,19.8);
	this.instance_33.compositeOperation = "multiply";

	this.instance_34 = new lib.CachedBmp_187();
	this.instance_34.setTransform(3.1,3.3,0.5,0.5);

	this.instance_35 = new lib.CachedBmp_34();
	this.instance_35.setTransform(-4.05,1.45,0.5,0.5);

	this.instance_36 = new lib.CachedBmp_190();
	this.instance_36.setTransform(3.45,3.55,0.5,0.5);

	this.instance_37 = new lib.Path_4();
	this.instance_37.setTransform(8.55,12.05,0.0677,0.0677,0,0,0,15.5,11.8);
	this.instance_37.compositeOperation = "multiply";

	this.instance_38 = new lib.Path_5_1();
	this.instance_38.setTransform(17.1,12,0.0677,0.0677,0,0,0,9.6,14.8);
	this.instance_38.compositeOperation = "multiply";

	this.instance_39 = new lib.Path_6_1();
	this.instance_39.setTransform(17.85,11,0.0677,0.0677,0,0,0,4.5,8.8);
	this.instance_39.compositeOperation = "multiply";

	this.instance_40 = new lib.Path_7_1();
	this.instance_40.setTransform(17.75,10.85,0.0677,0.0677,0,0,0,9.6,2.2);
	this.instance_40.compositeOperation = "multiply";

	this.instance_41 = new lib.Path_8();
	this.instance_41.setTransform(16.25,11.85,0.0677,0.0677,0,0,0,5.9,8.1);
	this.instance_41.compositeOperation = "multiply";

	this.instance_42 = new lib.Path_9_1();
	this.instance_42.setTransform(16.15,11.85,0.0677,0.0677,0,0,0,11.8,3.7);
	this.instance_42.compositeOperation = "multiply";

	this.instance_43 = new lib.Path_10();
	this.instance_43.setTransform(7.55,10.85,0.0677,0.0677,0,0,0,9.6,3);
	this.instance_43.compositeOperation = "multiply";

	this.instance_44 = new lib.Path_11_2();
	this.instance_44.setTransform(7.55,10.85,0.0677,0.0677,0,0,0,1.5,6.7);
	this.instance_44.compositeOperation = "multiply";

	this.instance_45 = new lib.Path_12_1();
	this.instance_45.setTransform(7.15,10.05,0.0677,0.0677,0,0,0,10.3,4.5);
	this.instance_45.compositeOperation = "multiply";

	this.instance_46 = new lib.Path_13_1();
	this.instance_46.setTransform(6.8,8.85,0.0677,0.0677,0,0,0,2.2,8.1);
	this.instance_46.compositeOperation = "multiply";

	this.instance_47 = new lib.Path_14();
	this.instance_47.setTransform(6.75,8.85,0.0677,0.0677,0,0,0,9.6,4.5);
	this.instance_47.compositeOperation = "multiply";

	this.instance_48 = new lib.Path_15();
	this.instance_48.setTransform(12.6,5.6,0.0677,0.0677,0,0,0,100.4,30.2);
	this.instance_48.alpha = 0.2188;
	this.instance_48.compositeOperation = "multiply";

	this.instance_49 = new lib.Path_16_1();
	this.instance_49.setTransform(12.7,10,0.0677,0.0677,0,0,0,46.5,12.6);
	this.instance_49.alpha = 0.5703;
	this.instance_49.compositeOperation = "overlay";

	this.instance_50 = new lib.CachedBmp_36();
	this.instance_50.setTransform(6.9,13.15,0.5,0.5);

	this.instance_51 = new lib.Path_18();
	this.instance_51.setTransform(19.6,9.4,0.0677,0.0677,0,0,0,0.8,0.8);
	this.instance_51.compositeOperation = "multiply";

	this.instance_52 = new lib.Path_19();
	this.instance_52.setTransform(12.6,10.9,0.0677,0.0677,0,0,0,104,42.8);
	this.instance_52.compositeOperation = "multiply";

	this.instance_53 = new lib.Path_20();
	this.instance_53.setTransform(12.9,4.5,0.0677,0.0677,0,0,0,70.9,14);
	this.instance_53.compositeOperation = "multiply";

	this.instance_54 = new lib.CachedBmp_189();
	this.instance_54.setTransform(5.55,2.5,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_10},{t:this.instance_9},{t:this.instance_8},{t:this.instance_7},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).to({state:[{t:this.instance_17},{t:this.instance_16},{t:this.instance_15},{t:this.instance_14},{t:this.instance_13},{t:this.instance_12},{t:this.instance_11}]},1).to({state:[{t:this.instance_25},{t:this.instance_24},{t:this.instance_23},{t:this.instance_22},{t:this.instance_21},{t:this.instance_20},{t:this.instance_19},{t:this.instance_18}]},1).to({state:[{t:this.instance_31},{t:this.instance_30},{t:this.instance_29},{t:this.instance_28},{t:this.instance_27},{t:this.instance_26}]},1).to({state:[{t:this.instance_34},{t:this.instance_33},{t:this.instance_32}]},1).to({state:[{t:this.instance_35}]},1).to({state:[{t:this.instance_54},{t:this.instance_53},{t:this.instance_52},{t:this.instance_51},{t:this.instance_50},{t:this.instance_49},{t:this.instance_48},{t:this.instance_47},{t:this.instance_46},{t:this.instance_45},{t:this.instance_44},{t:this.instance_43},{t:this.instance_42},{t:this.instance_41},{t:this.instance_40},{t:this.instance_39},{t:this.instance_38},{t:this.instance_37},{t:this.instance_36}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,0,30.8,18.1);


// stage content:
(lib.ninomontana = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = false; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {Neutral:18,M:21,Oh:24,Ee:26,Uh:27,"Neutral":30,"M":34,"Ee":36,"Uh":41,"M":42,"Oh":44,Ah:46,D:48,"Ah":50,L:54,"Neutral":56,"Ee":59,S:63,"M":64,"Ee":66,"D":70,"Oh":72,"M":74,"Uh":77,"M":79,"Ah":83,"Ee":85,"S":87,"Uh":90,"D":92,"Uh":94,"S":96,"M":97,"Ah":99,"D":101,"M":102,"Ee":103,"D":105,"Ee":107,Woo:109,"Uh":111,"M":113,"Oh":114,"M":116,"Uh":119,"D":120,"Ee":123};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,18,124];
	this.streamSoundSymbolsList[18] = [{id:"presenmp3copia",startFrame:18,endFrame:124,loop:1,offset:0}];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		var _this = this;
		/*
		Al hacer clic en la instancia del símbolo especificada, se ejecuta una función.
		*/
		_this.button_1.on('click', function(){
		/*
		Inicie la animación completa.
		*/
		createjs.Ticker.removeEventListener('tick', stage);
		createjs.Ticker.addEventListener('tick', stage);
		});
		var _this = this;
		/*
		Detenga la animación completa.
		*/
		createjs.Ticker.removeEventListener('tick', stage);
	}
	this.frame_18 = function() {
		var soundInstance = playSound("presenmp3copia",0);
		this.InsertIntoSoundStreamData(soundInstance,18,124,1);
	}
	this.frame_124 = function() {
		var _this = this;
		/*
		Al hacer clic en la instancia del símbolo especificada, se ejecuta una función.
		*/
		_this.button_5.on('click', function(){
		/*
		Inicie la animación completa.
		*/
		createjs.Ticker.removeEventListener('tick', stage);
		createjs.Ticker.addEventListener('tick', stage);
		});
		var _this = this;
		/*
		Detenga la animación completa.
		*/
		createjs.Ticker.removeEventListener('tick', stage);
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(18).call(this.frame_18).wait(106).call(this.frame_124).wait(2));

	// montaña
	this.instance = new lib.Símbolo8();
	this.instance.setTransform(300.25,397.3,1,1,0,0,0,56.4,50.3);
	new cjs.ButtonHelper(this.instance, 0, 1, 1);

	this.instance_1 = new lib.Símbolo7();
	this.instance_1.setTransform(111.45,240.45,1,1,0,0,0,44,52.9);
	new cjs.ButtonHelper(this.instance_1, 0, 1, 1);

	this.instance_2 = new lib.Símbolo6();
	this.instance_2.setTransform(277.05,82.15,1,1,0,0,0,43.2,39.1);
	new cjs.ButtonHelper(this.instance_2, 0, 1, 1);

	this.instance_3 = new lib.CachedBmp_1();
	this.instance_3.setTransform(42.2,80.4,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]},125).wait(1));

	// botoninicio
	this.button_1 = new lib.Símbolo4();
	this.button_1.name = "button_1";
	this.button_1.setTransform(321.4,254.25,0.35,0.35,0,0,0,111.6,115.2);
	new cjs.ButtonHelper(this.button_1, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.button_1).to({_off:true},1).wait(125));

	// bocas
	this.instance_4 = new lib.Símbolo3("single",5);
	this.instance_4.setTransform(309.3,139.4,1,1,0,0,0,12.2,9);
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(18).to({_off:false},0).wait(3).to({startPosition:4},0).wait(3).to({startPosition:6},0).wait(2).to({startPosition:4},0).wait(1).to({startPosition:6},0).wait(3).to({startPosition:5},0).wait(4).to({startPosition:4},0).wait(2).to({startPosition:4},0).wait(5).to({startPosition:6},0).wait(1).to({startPosition:4},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:0},0).wait(4).to({startPosition:1},0).wait(2).to({startPosition:5},0).wait(3).to({startPosition:4},0).wait(4).to({startPosition:2},0).wait(1).to({startPosition:4},0).wait(2).to({startPosition:4},0).wait(4).to({startPosition:3},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:4},0).wait(3).to({startPosition:6},0).wait(2).to({startPosition:4},0).wait(4).to({startPosition:0},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(3).to({startPosition:6},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:2},0).wait(1).to({startPosition:4},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:3},0).wait(1).to({startPosition:4},0).wait(1).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:0},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:4},0).wait(1).to({startPosition:6},0).wait(2).to({startPosition:4},0).wait(3).to({startPosition:6},0).wait(1).to({startPosition:3},0).wait(3).to({startPosition:4},0).to({_off:true},2).wait(1));

	// ojos
	this.instance_5 = new lib.Símbolo2("synched",0);
	this.instance_5.setTransform(307.3,102.6,1,1,0,0,0,30,9.1);
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(18).to({_off:false},0).to({_off:true},107).wait(1));

	// flash0_ai
	this.button_5 = new lib.Símbolo11();
	this.button_5.name = "button_5";
	this.button_5.setTransform(519.5,87.75,1,1,0,0,0,37.8,44.3);
	this.button_5._off = true;
	new cjs.ButtonHelper(this.button_5, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.button_5).wait(124).to({_off:false},0).to({_off:true},1).wait(1));

	// niñoparado
	this.instance_6 = new lib.CachedBmp_2();
	this.instance_6.setTransform(223.35,26.4,0.5,0.5);

	this.instance_7 = new lib.CachedBmp_173();
	this.instance_7.setTransform(223.35,26.4,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_6}]},18).to({state:[{t:this.instance_7}]},106).to({state:[]},1).wait(1));

	// niño
	this.instance_8 = new lib.Símbolo1("synched",0);
	this.instance_8.setTransform(-47.5,212.95,1,1,0,0,0,42.6,107.9);

	this.timeline.addTween(cjs.Tween.get(this.instance_8).to({x:284.45,startPosition:17},17).to({_off:true},1).wait(108));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(229.9,261.1,368.80000000000007,186.59999999999997);
// library properties:
lib.properties = {
	id: '8F2180329826BA438B79BA875AEE7279',
	width: 640,
	height: 480,
	fps: 24,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/ninomontana_atlas_1.png?1671661364184", id:"ninomontana_atlas_1"},
		{src:"sounds/presenmp3copia.mp3?1671661364352", id:"presenmp3copia"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['8F2180329826BA438B79BA875AEE7279'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused){
			stageChild.syncStreamSounds();
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;