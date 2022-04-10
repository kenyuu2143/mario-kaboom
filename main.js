const ENEMY_SPEED = 30
const MOVE_SPEED = 200
const JUMP_FORCE = 400
var isJumping;

const player = add([
  sprite('player'),
  scale(1.5),
  pos(20,20),
  body()
  ])


keyDown('right', () => { 
  player.move(MOVE_SPEED, 0);
});

keyDown('left', () => {
  player.move(-MOVE_SPEED, 0);
});

keyPress("space", () => {
  isJumping = true;
  player.jump(JUMP_FORCE);
});

const gameLevel = addLevel([
  '              ',
  '      @       ',
  '     ##   ?   ',
  '            * ',
  'xxx      xxxxx',
], {
  width: 20,
  height: 40,
  'x' : [sprite("ground"),solid(), 'ground'],
  '#' : [sprite("block"), solid(), scale(1.2), 'block'],
  '@' : [sprite("enemy"), solid(), body(), 'dangerous'],
  '?' : [sprite("item_block"), solid(), scale(1.2), 'coin-appear'],
  '*' : [sprite("goal"), solid(),scale(1.2), 'goal'],
  '&' : [sprite("non_block"), solid(), scale(1.2)]
})



action('dangerous', (d) => {
  d.move(-ENEMY_SPEED, 0)
})



player.collides('ground', () => {
  isJumping = false;
})

player.collides('dangerous', (d) => {
  if (isJumping){
    destroy(d)
  } else {
    go('lose')
  }
})

player.collides('goal', () => {
  go('goal')
})

player.action(() => {
  if (player.pos.y >= 500) {
    go('lose')
  }
})

player.on('headbump', (obj) => {
  if(obj.is('coin-appear')) {
    destroy(obj)
    gameLevel.spawn('&', obj.gridPos.sub(0,0))
  }
})