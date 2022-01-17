namespace SpriteKind {
    export const PowerUp = SpriteKind.create()
    export const powerup1 = SpriteKind.create()
}
function ememydeath (enemy: Sprite) {
    enemy.destroy(effects.fire, 500)
    if (Math.percentChance(24)) {
        PowerUP1 = sprites.create(assets.image`powerup`, SpriteKind.PowerUp)
        PowerUP1.x = enemy.x
        PowerUP1.y = enemy.y
    }
    if (Math.percentChance(23)) {
        Powerup2 = sprites.create(assets.image`3 hearts`, SpriteKind.powerup1)
        Powerup2.x = enemy.x
        Powerup2.y = enemy.y
    }
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . 2 2 2 2 2 2 2 2 2 2 2 . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, UFO, 200, 0)
    if (triplefiremode && triplefiremode.lifespan > 0) {
        projectile = sprites.createProjectileFromSprite(assets.image`Doublebullets`, UFO, 200, 0)
        projectile.x += 10
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.PowerUp, function (sprite, otherSprite) {
    triplefiremode = sprites.create(assets.image`bullet`, SpriteKind.Player)
    triplefiremode.setPosition(54, 8)
    triplefiremode.lifespan = 10000
    otherSprite.destroy()
})
statusbars.onZero(StatusBarKind.EnemyHealth, function (status) {
    ememydeath(status.spriteAttachedTo())
    music.powerUp.play()
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.powerup1, function (sprite, otherSprite) {
    info.changeLifeBy(3)
    otherSprite.destroy()
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.destroy()
    statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, otherSprite).value += -15
    info.changeScoreBy(1)
    music.pewPew.play()
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    music.powerDown.play()
    scene.cameraShake(6, 500)
    ememydeath(otherSprite)
})
let statusbar: StatusBarSprite = null
let ememy: Sprite = null
let triplefiremode: Sprite = null
let projectile: Sprite = null
let Powerup2: Sprite = null
let PowerUP1: Sprite = null
let UFO: Sprite = null
effects.starField.startScreenEffect()
UFO = sprites.create(assets.image`UFO`, SpriteKind.Player)
controller.moveSprite(UFO)
UFO.setStayInScreen(true)
music.beamUp.play()
info.setLife(5)
let enemyspeed = 20
let ememyspawntime = 2000
game.onUpdateInterval(5000, function () {
    enemyspeed += 5
    enemyspeed = Math.min(enemyspeed, 50)
    ememyspawntime += -150
    ememyspawntime = Math.max(ememyspawntime, 500)
})
forever(function () {
    pause(ememyspawntime)
    ememy = sprites.create(assets.image`enemy`, SpriteKind.Enemy)
    ememy.x = scene.screenWidth()
    ememy.vx = 0 - enemyspeed
    ememy.y = randint(10, scene.screenHeight() - 10)
    statusbar = statusbars.create(15, 2, StatusBarKind.EnemyHealth)
    statusbar.attachToSprite(ememy)
})
