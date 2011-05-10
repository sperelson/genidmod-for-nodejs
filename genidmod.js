/* 
GenIDMod.js
--------
This is a Node.js library that generates a unique numeric ID. It uses 
the time in microseconds and a counter to cater for sub-millisecond 
accesses. These are joined to form a value that is passed back in json 
format.

It is similar in concept to Twitter's Snowflake project. Just a lot less 
code and more limitations. It cannot run on more than one server instance, 
but it can handle 4096 iterations within a single millisecond with 
rollover protection.

Shortcomings
---------------------
No unique instance ID due to the limitation in Javascript's handling of 
large numbers. Even with this restriction, the timestamp will become too 
large and cause an overflow to occur.  This will happen around the year 
2079. If you adjust the starting epoch you could get around 69 years of 
reliable use.

Licensed with the MIT license
-----------------------------
Copyright (c) 2011 Stephen Perelson

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

var genid = function() {
	this.m_count	= 0;
	this.counter	= 0;
	this.millisOld	= 0;
};

genid.prototype.gen = function()
{
	var protectRollover = false;
	// 01 Jan 2010 is the selected epoch. Use
	// 		Date.UTC(2010,0,1)
	// to get this number (1262304000000)
	var millis = new Date().getTime() - 1262304000000;

	if (this.millisOld == millis) {
		this.counter++;
		// Rollover protection
		if (this.counter == 4095)
		{
			protectRollover = true;
			this.counter = 0;
			setTimeout(function () {
				console.log('rolledover');
  				arguments.callee;
			}, 1)
		}
	} else {
		this.millisOld = millis;
		this.counter = 0;
	}

	if (protectRollover == false)
	{
		millis = millis * Math.pow(2, 12);
		var uid = millis + this.counter;
		return uid;
	}
};

// Automatically execute the constructor so the module context is a genid
// singleton, since Node caches subsequent requires.
module.exports = new genid();
