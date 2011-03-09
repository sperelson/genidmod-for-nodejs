# GenIDMod.js
This is a Node.js library that generates a unique numeric ID. It uses 
the time in microseconds and a counter to cater for sub-millisecond 
accesses. These are joined to form a value that is passed back in json 
format.

It is similar in concept to Twitter's Snowflake project. Just a lot less 
code and more limitations. It cannot run on more than one server instance, 
but it can handle 4096 iterations within a single millisecond with 
rollover protection.

##Shortcomings
No unique instance ID due to the limitation in Javascript's handling of 
large numbers. Even with this restriction, the timestamp will become too 
large and cause an overflow to occur.  This will happen around the year 
2079. If you adjust the starting epoch you could get around 69 years of 
reliable use.
