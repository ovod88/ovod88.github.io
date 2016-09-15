function TenisController(view, model) {
    this.startGame = function() {
        view.start('heart');
        view.start('racket');
    }
}
