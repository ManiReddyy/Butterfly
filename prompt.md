# MASTER BUILD PROMPT — “MAHA 20” INTERACTIVE BIRTHDAY EXPERIENCE

You are an elite creative frontend engineer, interaction designer, motion designer, and digital experience director.

Build a premium, emotionally meaningful, highly interactive birthday website for my best friend **Mahanvitha**, whose birthday is **23 August 2026** and who turns **20**.

This is NOT a generic birthday template.

This should feel like a custom-made digital birthday experience — somewhere between a dreamy scrapbook, interactive storybook, cinematic motion website, playful mini-game, and personal love letter between close friends.

The website must feel hand-crafted, intimate, cute, slightly chaotic, nostalgic, premium, and emotionally real.

Do not make it look like an AI-generated birthday template.

Do not overuse gradients, glassmorphism, giant rounded cards, generic balloons, stock illustrations, or unnecessary 3D.

The personality should come from:

* handmade scrapbook details
* real photographs
* handwritten typography
* subtle doodles
* butterflies
* tiny flowers
* stars
* paper textures
* Polaroids
* tape
* little jokes
* cinematic transitions
* gentle interactions
* personal writing
* restrained pastel colors
* strong visual pacing

The result should look like something a very talented creative developer built specifically for one person.

---

# 1. CORE CONCEPT

The website is an interactive birthday journey.

The user should NOT immediately see the entire birthday content.

The experience is intentionally locked until:

**23 August 2026 — 12:00 AM — Asia/Kolkata timezone**

Before midnight, the website should show only a cinematic introduction and countdown.

At exactly midnight, the birthday experience unlocks.

Everything after the unlock should feel like a sequence of surprises.

Treat the entire website like one continuous story rather than disconnected web sections.

The emotional arc should be:

CURIOUS → PLAYFUL → SURPRISED → HAPPY → NOSTALGIC → EMOTIONAL → PLAYFUL AGAIN → NOSTALGIC → WARM → PEACEFUL

---

# 2. PERSONALITY / CHARACTER FOUNDATION

Mahanvitha is:

* caring
* slightly chaotic
* dramatic in a funny way
* quiet around strangers
* very expressive with people she is comfortable with
* deeply attached to family and friends
* not always verbally expressive
* someone whose concern is often shown through actions rather than dramatic words
* sometimes behaves like the baby of the group
* can be lazy when she doesn't want to do something
* has a sharp mind underneath an innocent appearance
* wants to enjoy life
* wants to live fully
* values the people around her
* has a playful personality
* has a soft heart

Use these traits subtly in the writing and interaction design.

Do NOT turn her into a fictional perfect princess.

Show her as a real person.

She can be:
cute + dramatic + lazy + caring + chaotic + mature + funny.

That combination is the personality.

---

# 3. SOURCE MATERIAL

The project contains two important source materials:

1. A PDF called `maha bday.pdf`
2. A long chat export between me and Mahanvitha

Use them as inspiration for the emotional tone and visual language.

The PDF contains:

* childhood photographs
* teenage photographs
* recent photographs
* birthday photographs
* family photographs
* friend photographs
* traditional photographs
* candid photographs
* scrapbook compositions
* handwritten annotations
* flowers
* butterflies
* Polaroids
* tape
* film strips
* doodles
* birthday typography
* childhood → present-day progression

Important visual references from the PDF include:

* childhood → adulthood progression
* “from little smiles to big dreams”
* “the girl behind all the chaos”
* “Drama Queen”
* “a little silence, a little madness, and a whole lot of magic”
* traditional-photo scrapbook layouts
* family/friend photo collections
* playful handwritten doodles

Do not blindly copy the PDF layouts.

Instead, extract the visual language and rebuild it as an interactive digital experience.

From the chat history, use the feeling of the friendship rather than displaying private conversations extensively.

The friendship contains years of:

* checking whether the other person ate
* asking what the other is doing
* good morning messages
* asking whether the other is free
* asking for calls
* teasing
* disappearing and coming back
* joking
* helping each other
* checking on each other
* casual everyday conversation

That mundanity is important.

The website should communicate:

“Nothing extraordinary had to happen every day. You were just there.”

---

# 4. VISUAL ART DIRECTION

Overall style:

dreamy pastel scrapbook × handmade journal × cinematic web experience

Primary background:

* warm ivory
* creamy white
* extremely pale blush
* muted peach
* dusty pink
* soft lavender
* pale butter yellow
* very subtle sage

Use dark brown / muted plum / soft charcoal for text instead of harsh pure black whenever appropriate.

Do NOT make the site overwhelmingly pink.

Use color hierarchy.

Some sections can shift palette subtly.

Example:

Countdown:
cream + lavender + blush

Birthday reveal:
peach + pink + golden light

Letter:
warm paper / cream / soft rose

Memory sections:
cream + muted colors

Traditional section:
warm rose / dusty coral / ivory

Final section:
deep dusty mauve + cream + soft stars

---

# 5. TYPOGRAPHY

Use a sophisticated pairing:

Display:

* elegant serif
* editorial feeling

Body:

* clean modern sans-serif

Handwritten:

* expressive handwritten font for doodles and notes

Suggested personality:

Display:
Cormorant Garamond / DM Serif / similar

Body:
DM Sans / Inter / similar

Handwritten:
Caveat / Patrick Hand / similar

Use handwritten typography selectively.

Do NOT turn every piece of text into handwriting.

---

# 6. BACKGROUND DETAILS

Throughout the site, create a living background system.

Very subtle:

* butterflies slowly floating
* hand-drawn hearts
* flower line drawings
* tiny stars
* paper grain
* soft particles
* occasional doodle strokes
* tiny arrows
* imperfect circles
* hand-drawn underlines

These elements should move gently.

The background should NEVER feel like a static wallpaper.

However, animation density must stay controlled.

The user should still be able to read everything comfortably.

---

# 7. TECHNOLOGY

Use:

* React
* Vite
* TypeScript
* React Three Fiber
* Three.js
* GSAP
* Lenis
* canvas-confetti where appropriate
* CSS animations where they are more efficient
* Web Audio API or Howler for audio if required

Use Three.js / React Three Fiber only for meaningful immersive moments.

Use DOM/CSS for:

* typography
* photos
* letter
* buttons
* game UI
* forms
* text
* scrapbook compositions

Use WebGL selectively for:

* particles
* starfields
* atmospheric depth
* butterfly particles
* transition environments
* floating 3D objects
* subtle background effects

Use GSAP timelines to coordinate multi-step transitions.

Use Lenis for premium smooth scrolling in the unlocked experience.

Keep animation cleanup robust.

Do not create memory leaks.

Do not leave unnecessary animation loops running on hidden screens.

Respect `prefers-reduced-motion`.

---

# 8. STATE MACHINE

The experience should be state-driven.

Create explicit experience states.

Example:

INTRO
COUNTDOWN
UNLOCKING
SURPRISE_PROMPT
BIRTHDAY_REVEAL
BALLOON_CAKE
CANDLES
ENVELOPE
LETTER
WISH
HEART_GAME
MEMORY_WORLD
PHOTO_GALLERY
FINAL_MESSAGE

The state should be persisted in localStorage so refreshing the page does not accidentally reset the birthday experience after unlock.

Before midnight:

* countdown remains locked
* future content cannot be accessed

After midnight:

* unlock permanently for that browser

---

# 9. COUNTDOWN SCREEN

This is the first actual screen.

At the beginning, show:

19

Then smoothly morph / transform:

19 → 20

The transition should be beautiful and symbolic rather than cheesy.

Use:

* liquid number morph
* particles
* soft light
* butterflies
* subtle lens glow
* floating paper elements

After the transformation, show:

MAHA

23 AUGUST 2026

Then:

“Something is waiting for you...”

Followed by a live countdown:

DAYS
HOURS
MINUTES
SECONDS

However, because the birthday is specifically the next unlock moment, make the countdown visually prominent.

Use the timezone:

Asia/Kolkata

Target:
2026-08-23T00:00:00+05:30

IMPORTANT:

THE COUNTDOWN MUST NEVER SKIP FORWARD INTO THE BIRTHDAY CONTENT BEFORE ZERO.

Before the target time:

* the entire experience remains locked

At target time:

* freeze the countdown
* trigger the unlock sequence

After target time:

* immediately show the unlock experience

Avoid relying solely on client system time without explaining the logic.

Make the target timestamp explicit in code.

Do not create a fake countdown.

---

# 10. MIDNIGHT UNLOCK

At zero:

1. countdown stops
2. numbers dissolve
3. background particles begin moving faster
4. butterflies emerge
5. screen softly darkens
6. golden/peach light begins glowing
7. tiny particles gather in the center
8. transition into a new screen

Text:

“Okay...”

pause

“It's finally your day.”

pause

“I made something for you.”

Then:

“Do you want to see it?”

Buttons:

YES ♡
NO 🙃

The buttons must be beautiful.

---

# 11. THE “NO” BUTTON

The NO button should be playful.

Initially clickable.

When the user attempts to click it:

* move it away slightly

Second attempt:

* move farther

Show playful messages such as:

“Nice try 😭”

then:

“Nope.”

then:

“You don't actually get a NO button.”

Eventually:

“Just press YES, birthday girl ♡”

The movement should work equally well on:

* mouse
* touch

Do NOT create an inaccessible loop.

The YES button must always remain usable.

The prank should be funny and cute.

---

# 12. YES → BIRTHDAY REVEAL

When YES is pressed:

Create a cinematic transformation.

Timeline:

YES button click
→ button expands slightly
→ entire screen blooms
→ particles emerge
→ butterflies fly upward
→ background shifts to warm pastel
→ large typography enters

Show:

HAPPY BIRTHDAY

then:

MAHANVITHA ♡

then:

OUR BABY GIRL TURNS 20

Do not show all text simultaneously.

Use staggered typography.

Add:

* fireworks
* stars
* tiny heart particles
* butterflies
* flowers
* confetti

Do NOT use cheap emoji overload.

The decorative elements should feel illustrated / handmade.

---

# 13. BIRTHDAY HERO IMAGE

After the title reveal, bring in one strong portrait of Maha.

Use the best available real image supplied in the project's assets.

Frame it as:

* Polaroid
* scrapbook cutout
* subtle torn-paper edge

Animate it from slightly below the screen.

Add small handwritten notes around it.

Possible notes:

“birthday girl”
“20 already??”
“how did that happen 😭”
“still baby though”

Keep these editable in content files.

---

# 14. BALLOON INTERACTION

Transition into a dreamy birthday room/sky.

Create around 10–20 pastel balloons.

Balloons should move realistically but remain performant.

Each can:

* float
* gently rotate
* react to pointer
* respond to touch

One should say:

“pop me”

When clicked:

* balloon pops
* tiny particles burst
* sound effect optionally plays
* small heart/star particles appear

Some balloons may reveal tiny phrases:

“Drama Queen”
“Baby”
“Chaos”
“Rabbit”
“Care”
“20”
“Bestie”

Do not make this too obvious immediately.

---

# 15. CAKE REVEAL

After enough balloons have been popped, reveal a cake.

The cake should feel elegant and cute.

Use:

* pastel frosting
* strawberries/flowers if appropriate
* small 20 topper
* candles

Show:

“Okay birthday girl...”

“Make a wish.”

Put 20 candles on the cake.

The candle flames should flicker.

---

# 16. BLOW OUT THE CANDLES

Implement real candle interaction.

Preferred:

* microphone blow detection

Use Web Audio API if feasible.

Ask for microphone permission only when the user reaches this stage.

If microphone permission is denied:
provide a graceful alternative:

“Okay okay... we'll do it the easy way 😭”

Button:

BLOW THEM OUT ✨

Do not block the experience because of microphone permissions.

When candles are blown:

* flames disappear
* smoke particles rise
* room darkens slightly
* golden particles float upward
* confetti begins softly
* cake fades backward

Then transition into the envelope.

---

# 17. ENVELOPE

A physical-looking envelope enters the scene.

Use:

* paper texture
* soft shadow
* subtle depth
* wax seal / heart

Text on envelope:

“For Maha ♡”

Interaction:
tap/click envelope

Animation:

* flap opens
* letter slides out
* camera subtly moves closer
* background becomes quieter

The transition should feel intimate.

---

# 18. LETTER

The letter should resemble a real handwritten letter.

Use warm paper.

Add:

* tiny flower drawing
* small butterfly
* handwritten signature
* paper shadow
* tiny tape

The text should appear as if being written.

Use GSAP for the reveal.

Do NOT generate generic romantic filler.

The letter should feel personal, conversational, slightly funny, and sincere.

Tone:

* grateful
* nostalgic
* affectionate
* honest
* playful
* occasionally teasing
* not overly poetic
* not excessively dramatic

The letter should communicate things like:

You may not always say what you feel.

You don't always know what to say when someone is struggling.

But you care.

You show it in little ways.

You've been there.

Years of random conversations became something meaningful.

The ordinary things are what make the friendship special.

Be grateful for her presence.

Wish her a beautiful 20th year.

Tell her to keep smiling.

Tell her to keep her weirdness.

Tell her to keep being herself.

Add a playful ending.

Potential emotional closing style:

“Don't get emotional after reading this.
I still have enough embarrassing photos to ruin your mood.”

Use actual personal details from my source material where appropriate.

Do not invent major life events.

---

# 19. WISH BOX

After the letter:

Text:

“Okay... enough about what I wanted to say.”

“Now I want to know what YOU want.”

Show a dreamy wish box.

Prompt:

“If the universe gave you one wish today...”

“What would you ask for?”

Text input.

Button:

MAKE MY WISH ✨

When submitted:

* text folds into a small glowing paper star
* star transforms into butterfly light
* flies into the sky
* becomes one of many glowing stars

Do not upload/store the wish remotely.

Keep it local/private unless an explicit backend is later added.

---

# 20. HEART GAME

After the wish disappears:

Text:

“One last thing.”

Then:

“You've found the wish.”

“Now find the 20 hearts.”

Create a playful mini-game.

20 hearts are distributed across the scene.

Use:

* absolute positioned DOM objects
* lightweight particle effects
* simple collisions/hover detection

Do not use complex physics if unnecessary.

Each heart should be unique.

Some can:

* float
* move
* hide behind a flower
* appear after clicking a butterfly
* briefly disappear and reappear
* react to cursor proximity

Counter:

20 hearts

Progress UI:

♡ 01 / 20

As each is collected:

* heart pops
* tiny particle burst
* pleasant sound
* counter updates

At 20:

Screen pauses.

Text:

“You found all 20.”

Then:

“So I guess you earned the rest. ♡”

Transition into the memory world.

---

# 21. MEMORY WORLD

This is the main storytelling section.

DO NOT make it look like a standard website.

Create chapters.

Possible chapter names:

01 — LITTLE MAHA
02 — THE CHAOS
03 — DRAMA QUEEN
04 — SOFT HEART
05 — TRADITIONAL MAHA
06 — HER PEOPLE
07 — US
08 — TODAY

Each chapter should have a distinctive visual treatment.

---

# 22. CHILDHOOD CHAPTER

Use childhood photographs from the provided PDF/assets.

Visual style:

* old paper
* Polaroid
* tape
* scribbles
* tiny flowers
* handwritten annotations

Text:

“From little smiles...”

then:

“to big dreams.”

Do not overanimate.

Use slow parallax.

Photo enters with slight rotation.

Handwritten labels can say:

“tiny human”
“before the chaos”
“look at this baby 😭”

---

# 23. CHAOS CHAPTER

Use funny/candid photos.

Create a scrapbook wall.

Photos can have different rotations.

Text snippets:

“a little silence”
“a little madness”
“a whole lot of magic”

Show images in layers.

On scroll:

* one photo moves slightly faster
* another moves slower
* background doodles move subtly

Make it feel tactile.

---

# 24. DRAMA QUEEN CHAPTER

Use a more playful visual language.

Title:

“DRAMA QUEEN”

Possible captions:

“Peace and quiet?”

“No.”

“Always dramatic?”

“Obviously.”

Create fake documentary-style evidence cards.

Examples:

“EXHIBIT A”
“EXHIBIT B”
“UNDENIABLE PROOF”

Keep this section funny.

---

# 25. SOFT HEART CHAPTER

Shift the music and palette.

Make this section slower.

Use warm photos of Maha with people she cares about.

Main line:

“You don't always know what to say.”

pause

“But somehow...”

pause

“You always know how to care.”

This should be one of the emotional peaks of the website.

Use subtle butterfly movement.

No loud effects.

---

# 26. TRADITIONAL CHAPTER

Use the traditional clothing photos from the birthday PDF.

Create a luxurious editorial scrapbook style.

Visual treatment:

* warm rose
* cream
* gold accents
* floral illustrations
* elegant serif typography
* Polaroid frames

Avoid overly flashy gold.

Make it tasteful.

---

# 27. HER PEOPLE CHAPTER

Use:

* family photos
* friend photos
* group photos

Create a large layered collage.

Add tiny annotations:

“her people”
“her safe place”
“the people she loves”
“the people who love her”

Keep the composition organic.

---

# 28. “US” CHAPTER

This is very important.

Do not reveal private chat history directly.

Instead, turn the RHYTHM of the friendship into visual art.

Create floating message bubbles.

Examples inspired by our conversations:

“Tinnava?”
“Nuvvu?”
“Em chestunnav?”
“Free unnaava?”
“Call?”
“Good morning 😊”
“Hah..”
“Hmm..”
“Bye gn”

Use them like little memory fragments.

The bubbles should appear around our photographs.

Some disappear.

Some overlap.

Some drift into the background.

Then central statement:

“Maybe this is what makes our friendship special.”

followed by:

“Nothing extraordinary had to happen every day.”

“You were just there.”

This section should feel deeply personal.

---

# 29. MESSAGE FRAGMENTS

Use actual chat-derived fragments only where appropriate.

Do not expose:

* phone numbers
* passwords
* private credentials
* sensitive information
* private third-party details

Never display sensitive chat information.

Only use harmless emotional/conversational fragments.

---

# 30. INFINITE PHOTO GALLERY

Create an infinite horizontal gallery.

It should feel like a giant moving scrapbook.

Do NOT create a normal masonry gallery.

Structure:

PHOTO → PHOTO → MESSAGE → PHOTO → POLAROID → PHOTO → DOODLE → PHOTO → TEXT → PHOTO...

The gallery should loop infinitely.

Interactions:

* drag with mouse
* swipe on touch
* wheel can influence horizontal movement
* slight inertia
* hover enlarges photo gently
* click opens a fullscreen photo viewer

Use Lenis for the overall smoothness where appropriate, but do not hijack scrolling unnecessarily.

Photo viewer:

* subtle zoom
* caption
* close button
* keyboard escape support

---

# 31. PHOTO DATA ARCHITECTURE

Do not hardcode every image into JSX.

Create a data structure such as:

photos.ts

Each photo object:

{
src,
chapter,
caption,
rotation,
tape,
year,
featured
}

Make it extremely easy to add/remove photos.

Use the real uploaded photos.

Do not generate fake photos of Maha.

Do not alter her face.

Do not replace her with AI-generated people.

---

# 32. FINAL SECTION

After the infinite gallery, slow everything down.

Remove most particles.

Reduce movement.

Show a large photograph.

Then:

“HAPPY 20TH, MAHA ♡”

Next:

“Keep laughing.”

“Keep caring.”

“Keep being a little chaotic.”

“And please...”

“never become completely normal.”

Pause.

Then:

“I'm really lucky to have you.”

Signature:

“— from your idiot bestie”

or a more personal signature that matches my actual tone.

Do not make this overly romantic.

It is a deeply affectionate best-friend relationship.

---

# 33. FINAL BUTTERFLY

After the final text:

A butterfly slowly appears.

It flies across the screen.

The cursor can slightly influence its path.

The butterfly moves upward.

Camera slowly follows it.

The final screen becomes:

cream background

tiny stars

one flower

one handwritten line:

“See you in the next chapter. ♡”

Then fade out.

---

# 34. MUSIC

Music should be optional.

Do not autoplay loud music.

Create a small floating music control:

♡ ♪

When enabled:

* ambient dreamy music begins
* volume starts low
* transitions can trigger small sound effects

Use different sound categories:

* soft UI click
* balloon pop
* candle extinguish
* paper movement
* envelope opening
* heart collection
* magical transition

Do NOT overload the site with sounds.

Every sound should be subtle.

---

# 35. PERFORMANCE

This website may contain:

* many images
* particles
* animations
* Three.js
* confetti
* interactive components

Optimize aggressively.

Requirements:

* lazy-load non-critical images
* compress images
* use WebP/AVIF when possible
* preload only hero assets
* pause WebGL animation when section is not visible
* use IntersectionObserver
* prevent unnecessary React renders
* avoid giant canvas textures
* keep mobile performance acceptable
* avoid huge uncompressed original photos
* respect reduced motion

Mobile must be treated as a first-class experience.

---

# 36. RESPONSIVE DESIGN

Desktop:
cinematic large composition

Tablet:
slightly simplified composition

Mobile:
full-screen vertical storytelling

The mobile experience must NOT feel like a broken desktop layout.

On mobile:

* fewer simultaneous particles
* simpler Three.js effects
* touch-first interactions
* balloons spaced appropriately
* hearts large enough to tap
* gallery should support swipe
* letter should remain readable
* cake should fit the viewport
* no important element should require hover

---

# 37. ACCESSIBILITY

Support:

* keyboard navigation
* visible focus states
* sufficient contrast
* accessible buttons
* reduced motion
* screen-reader labels for controls
* escape key to close photo viewer
* microphone permission fallback

The prank NO button must never make the page unusable.

---

# 38. ERROR / FALLBACK HANDLING

If images fail:
show elegant scrapbook placeholders instead of broken image icons.

If microphone is denied:
show manual candle interaction.

If WebGL fails:
fall back to CSS/DOM particles and gradients.

If audio fails:
continue silently.

If device is low-power:
reduce particle count automatically.

Never allow a failed enhancement to break the core birthday experience.

---

# 39. PROJECT STRUCTURE

Create a clean architecture such as:

src/
components/
scenes/
sections/
animations/
hooks/
data/
styles/
utils/

Suggested major components:

BirthdayApp
CountdownScreen
BirthdayUnlock
BirthdayReveal
BalloonScene
CakeScene
CandleInteraction
EnvelopeScene
LetterScene
WishBox
HeartGame
MemoryWorld
ChapterSection
InfiniteGallery
FinalScene
BackgroundEffects
MusicController
PhotoViewer

Keep content separate from components.

---

# 40. DATA / CONTENT SEPARATION

Create editable configuration:

birthdayConfig.ts

containing:

name
birthday
age
targetTimestamp
signature
letter
chapters
photos
messageFragments
heartGameMessages
finalMessage

This should allow me to edit the personal content without touching animation code.

---

# 41. DEVELOPMENT QUALITY

Do not output a superficial prototype.

Build the interactions.

Do not replace difficult animations with comments like:

// add animation here

Actually implement them.

Do not leave placeholder boxes everywhere.

Use meaningful animation systems.

Do not use generic templates.

Every major transition should feel intentional.

---

# 42. DESIGN RULES

NEVER:

* use random stock birthday illustrations
* use generic birthday webpage sections
* use massive gradients everywhere
* use excessive glassmorphism
* use neon cyberpunk styling
* use overly childish fonts
* use emoji as the primary design language
* create an ordinary card grid
* overuse 3D
* create a fake AI-generated version of Maha
* make it feel like a SaaS dashboard
* make it look like a wedding invitation
* make it excessively romantic
* use huge amounts of text on screen
* create inaccessible interactions

ALWAYS:

* prioritize real photographs
* use subtle handmade details
* create visual breathing room
* use cinematic pacing
* use restrained colors
* use typography carefully
* create interactive surprises
* make transitions feel physical
* keep emotional moments quiet
* use humor between emotional moments
* make everything feel custom

---

# 43. IMPORTANT CONTENT PHILOSOPHY

The website should tell a story:

“She was once a tiny kid.”

↓

“She grew into this chaotic, dramatic, caring human.”

↓

“She built relationships with people.”

↓

“She became the person we know.”

↓

“She became someone important to me.”

↓

“Today she turns 20.”

↓

“Here is something I made just for her.”

The emotional climax should NOT happen at the Happy Birthday screen.

The emotional climax should happen later in the letter + friendship/memory chapters.

That is what makes the experience memorable.

---

# 44. FINAL QUALITY BAR

When finished, the website should feel like:

“A premium interactive digital scrapbook made by someone who knows her extremely well.”

Not:

“A birthday template with animations.”

Think:

Apple-level interaction polish
+
editorial scrapbook aesthetic
+
soft romantic cinema
+
playful best-friend humor
+
personal memory archive

Make the page feel alive.

Make the interactions feel intentional.

Make the photos feel precious.

Make the typography breathe.

Make the reveal feel earned.

Most importantly:

WHEN MAHANVITHA FINISHES THE WEBSITE, SHE SHOULD FEEL THAT THIS WAS MADE SPECIFICALLY FOR HER.

Not for “a birthday girl.”

For **her**.

Build the entire experience around that principle.
also mobile responsive.