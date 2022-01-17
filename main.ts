namespace SpriteKind {
    export const PowerUp = SpriteKind.create()
}
function ememydeath (enemy: Sprite) {
    enemy.destroy(effects.fire, 500)
    if (Math.percentChance(40)) {
        PowerUP1 = sprites.create(assets.image`powerup`, SpriteKind.PowerUp)
        PowerUP1.x = enemy.x
        PowerUP1.y = enemy.y
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
    if (doublefiremode) {
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
        projectile.x += 10
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.PowerUp, function (sprite, otherSprite) {
    doublefiremode = sprites.create(assets.image`Doublebullets`, SpriteKind.Player)
    doublefiremode.setPosition(54, 8)
})
statusbars.onZero(StatusBarKind.EnemyHealth, function (status) {
    ememydeath(status.spriteAttachedTo())
    music.powerUp.play()
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
let doublefiremode: Sprite = null
let projectile: Sprite = null
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
