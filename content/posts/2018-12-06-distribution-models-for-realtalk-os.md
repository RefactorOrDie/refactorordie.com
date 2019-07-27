---
title: "Realtalk OS language notes"
date: 2018-12-06T9:00:00-08:00
type: "post"
draft: false
---

Over the past four weeks, I have been experimenting with reverse-engineering the Realtalk language used in the Dynamicland project.
Realtalk (as implemented at Dynamicland) is a superset of the Lua language. Realtalk code goes in, and is transpiled and executed in the context of RealtalkOS. I will refer to the language as Realtalk and the system as RealtalkOS. I think of these two as Clojure and the JVM, where Lua is analogous to JVM byte-code.
Here is a sample of some Realtalk code written for a voice assistant:
```lua
When /person/ says /words/:
	local does_recognize_greeting = recognize_greeting(words)
	if does_recognize_greeting then
		Claim (person)'s words (words) recognized as "greeting".
	end
End

When /someone/'s words /_/ recognized as "greeting":
	When the time of day is "morning":
		Wish to speak "Good morning".
	Otherwise:
		Wish to speak "Hello".
	End
End

-- "... hour of day is _" will only have one value at a time,
-- when "... hour of day is _" is updated, claims made based on the previous value are invalidated, and this block is reevaluated
When hour of day is /hour/:
	if hour < 11 then
		Claim the time of day is "morning".
	else if hour < 18 then
		Claim the time of day is "afternoon".	
	else
		Claim the time of day is "night".	
	end
End

-- someone might be an identifier for the context which requested the wish 
When /someone/ wishes to speak /text/:
	local audio = text_to_speech(audio)
	Wish to play (audio) once.
End

function recognize_greeting(words)
	-- words is probably a list of strings
	-- snipped
	return true
end
```

In this example, we can see RealtalkOS adds "When", "Claim", and "Wish" (among others listed below) operators which operate and respond to changes to facts in the system.

