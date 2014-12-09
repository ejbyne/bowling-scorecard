Bowling Scorecard
=======================

## Synopsis

My Week 4 challenge at Makers Academy was to create a 10 pin bowling scorecard in JavaScript.

## Technologies Used

- JavaScript
- Jasmine
- JQuery
- HTML
- CSS

## Job List

- Count and sum the scores of a bowling game for one player (in JavaScript).
- A bowling game consists of 10 frames in which the player tries to knock down the 10 pins. In every frame the player can roll one or two times. The actual number depends on strikes and spares. The score of a frame is the number of knocked down pins plus bonuses for strikes and spares. After every frame the 10 pins are reset.
- The player has a strike if he knocks down all 10 pins with the first roll in a frame. The frame ends immediately (since there are no pins left for a second roll). The bonus for that frame is the number of pins knocked down by the next two rolls. That would be the next frame, unless the player rolls another strike.
- The player has a spare if the knocks down all 10 pins with the two rolls of a frame. The bonus for that frame is the number of pins knocked down by the next roll (first roll of next frame).
- If the player rolls a strike or spare in the 10th frame they can roll the additional balls for the bonus. But they can never roll more than 3 balls in the 10th frame. The additional rolls only count for the bonus not for the regular frame count.
- A Gutter Game is when the player never hits a pin (20 zero scores).
- A Perfect Game is when the player rolls 12 strikes (10 regular strikes and 2 strikes for the bonus in the 10th frame). The Perfect Game scores 300 points.
- Optional: Create a nice interactive animated interface with jQuery.

## Favourite Code Snippet

I was particularly pleased with the neat solution for adding bonuses to the frames. At the end of each frame a bonus of 2 is added to the frame for a strike, or 1 for a spare. Then in subsequent frames the "addPreviousFramesBonus" function checks for any bonuses, adds the applicable score to that frame, and reduces the bonus count by 1: 

~~~
   ScoreCard.prototype.addPreviousFramesBonus = function(pinsHit) {
    for (var frame = 0; frame < this.frames.length-1; frame++) {
      if (this.frames[frame].bonus > 0) {
        this.frames[frame].score += parseInt(pinsHit);
        this.frames[frame].bonus--;
      }
    }
  };
~~~

## Collaborators

- None

## Still to complete/refactor

- None

## Takeaway

This was a great challenge for learning object oriented programming in JavaScript. Whilst it was relatively straightforward to get the basic game logic in place, my code initially looked really ugly and the hardest part was learning to refactor the code into manageable functions.

I also put a lot of work into learning and getting to grips with using JQuery/JavaScript for my front-end design, in order to ensure the scorecard updated correctly and appropriate game messages were displayed.