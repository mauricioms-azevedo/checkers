var divs = document.getElementsByClassName('cell')
var blackPiece = document.getElementsByClassName('blackPiece')
var whitePiece = document.getElementsByClassName('whitePiece')
var blackPieceMove = document.getElementsByClassName('blackPieceMove')
var whitePieceMove = document.getElementsByClassName('whitePieceMove')
var damaBlackPiece = document.getElementsByClassName('damaBlackPiece')
var damaWhitePiece = document.getElementsByClassName('damaWhitePiece')
var whitePieceEaten = document.getElementsByClassName('whitePieceEaten')
var blackPieceEaten = document.getElementsByClassName('blackPieceEaten')
var blackPieceClone = blackPiece[0].cloneNode(true)
var whitePieceClone = whitePiece[0].cloneNode(true)
var blackPieceMoveClone = blackPieceMove[0].cloneNode(true)
var whitePieceMoveClone = whitePieceMove[0].cloneNode(true)
var damaBlackPieceClone = damaBlackPiece[0].cloneNode(true)
var damaWhitePieceClone = damaWhitePiece[0].cloneNode(true)
var whitePieceEatenClone = whitePieceEaten[0].cloneNode(true)
var blackPieceEatenClone = blackPieceEaten[0].cloneNode(true)
var blackEaten = document.getElementById('blackEaten')
var whiteEaten = document.getElementById('whiteEaten')
var possibleDashed = document.getElementsByClassName('teste')
var tabuleiro = document.querySelector('.myExcludedDiv')
var body = document.getElementsByTagName('HTML')[0]
var darken = document.querySelector('.darken')
var noClick = '.noClick'
var jumpPossible = 0
var toggleShadow = true
var turnBlack = false
var inicio = true
var x = 0
var y = 0
var eaten
var whitePoints = 0
var blackPoints = 0


document.body.addEventListener( "click", function(e){
	darken.style.display = 'inline-block'

	setTimeout(function(){
		darken.style.opacity = '0.3'	
	}, 10)

	for(i=0; i<divs.length; i++){

		if(divs[i].firstChild){
		divs[i].firstChild.style.boxShadow = '0 0 0 0 black'
		}
	}

	for(i=0; i<possibleDashed.length; i++){
	
		if(possibleDashed[i].classList.contains('zeroOpacity')){
			possibleDashed[i].classList.remove('zeroOpacity')
    	}
    	possibleDashed[i].style.opacity = '0'
    }
  }
)

tabuleiro.addEventListener( "click", function(e){
    e.stopPropagation()
})

darken.addEventListener( "click", function(e){
    darken.style.opacity = '0'

    setTimeout(function(){
    	darken.style.display = 'none'
    	for(i=0; i<divs.length; i++){
			if(divs[i].firstChild){
				if(divs[i].classList.contains('possibleJ')){
					divs[i].firstChild.style.boxShadow = '0 0 5px 2px white'
				}
			}
		}
    }, 100)
    e.stopPropagation()
})

function reset(){

	for(i=0; i<possibleDashed.length; i++){
		if(turnBlack==true){
			possibleDashed[i].style.border = '2px dashed #7F7F7B'
		}else if(turnBlack!==true){
			possibleDashed[i].style.border = '2px dashed #fff6be'
		}
	}

	for(i=0; i<divs.length; i++){
		divs[i].style.backgroundColor = '#c8a67d'
		divs[i].classList.remove('clicked')
		divs[i].classList.remove('possibleCell')
		divs[i].classList.remove('p9')
		divs[i].classList.remove('p7')
		divs[i].classList.remove('p-7')
		divs[i].classList.remove('p-9')
		divs[i].classList.remove('p14')
		divs[i].classList.remove('p18')
		divs[i].classList.remove('p-14')
		divs[i].classList.remove('p-18')
		divs[i].removeAttribute('onclick')
		divs[i].style.cursor = 'default'
	}
}

for(i=0; i<64; i++){

	divs[i].setAttribute('id', 'a'+(i+1))
}

function begin(){

	for(i=0; i<divs.length; i++){

		if(divs[i].classList.contains('black') && divs[i].classList.contains('damaBlack')==false){

			blackPieceClone = blackPiece[0].cloneNode(true)
			divs[i].prepend(blackPieceClone)
			divs[i].classList.add('marked')
		}

		if(divs[i].classList.contains('white') && divs[i].classList.contains('damaWhite')==false){

			whitePieceClone = whitePiece[0].cloneNode(true)
			divs[i].prepend(whitePieceClone)
			divs[i].classList.add('marked')
		}
		
		if(divs[i].classList.contains('damaBlack')){
			damaBlackPieceClone = damaBlackPiece[0].cloneNode(true)
			divs[i].prepend(damaBlackPieceClone)
			divs[i].classList.add('marked')
		}
		
		if(divs[i].classList.contains('damaWhite')){
			damaWhitePieceClone = damaWhitePiece[0].cloneNode(true)
			divs[i].prepend(damaWhitePieceClone)
			divs[i].classList.add('marked')
		}
	}
}
begin()

function possibleJump(f, g, dama, justTurned){

	for(i=0; i<divs.length; i++){

		if(divs[i].firstChild){
			divs[i].firstChild.removeAttribute('style')
		}
	}

	for(i=0; i<divs.length; i++){

		if(dama == 'white'){
			f.firstChild.classList.add('damaWhitePiece')
			f.firstChild.classList.remove('whitePiece')
			f.classList.add('damaWhite')
			resetAll()
			possibleJump(f, 'sim', 0, true)
			return
		}

		if(dama == 'black'){
			f.firstChild.classList.add('damaBlackPiece')
			f.firstChild.classList.remove('whitePiece')
			f.classList.add('damaBlack')
			resetAll()
			possibleJump(f, 'sim', 0, true)
			return
		}

		if(turnBlack !== true){

			if(divs[i].classList.contains('white')){

				if(i-7>0 && i-14>0 && divs[i-7].classList.contains('black') && divs[i-7].classList.contains('right')==false && divs[i-7].classList.contains('left')==false && divs[i-14].classList.contains('marked')==false){
					divs[i].firstChild.setAttribute('onclick', 'showMoves(this)')
					divs[i].firstChild.style.cursor = 'pointer'
					divs[i].firstChild.style.boxShadow = '0 0 5px 2px white'
					divs[i].classList.add('possibleJ', '-14')

				}else{
					jumpPossible++
				}

				if(i-9>0 && i-18>0 && divs[i-9].classList.contains('black') && divs[i-9].classList.contains('right')==false && divs[i-9].classList.contains('left')==false && divs[i-18].classList.contains('marked')==false){
					divs[i].firstChild.setAttribute('onclick', 'showMoves(this)')
					divs[i].firstChild.style.cursor = 'pointer'
					divs[i].firstChild.style.boxShadow = '0 0 5px 2px white'
					divs[i].classList.add('possibleJ', '-18')

				}else{
					jumpPossible++
				}

				if(divs[i].classList.contains('damaWhite') || divs[i].firstChild.classList.contains('lastMovedJumped')){

					if(i+7<63 && i+14<63 && divs[i+7].classList.contains('black') && divs[i+7].classList.contains('right')==false && divs[i+7].classList.contains('left')==false && divs[i+14].classList.contains('marked')==false){
						divs[i].firstChild.setAttribute('onclick', 'showMoves(this)')
						divs[i].firstChild.style.cursor = 'pointer'
						divs[i].firstChild.style.boxShadow = '0 0 5px 2px white'
						divs[i].classList.add('possibleJ', '14')

					}else{
						jumpPossible++
					}
					
					if(i+9<63 && i+18<63 && divs[i+9].classList.contains('black') && divs[i+9].classList.contains('right')==false && divs[i+9].classList.contains('left')==false && divs[i+18].classList.contains('marked')==false){
						divs[i].firstChild.setAttribute('onclick', 'showMoves(this)')
						divs[i].firstChild.style.cursor = 'pointer'
						divs[i].firstChild.style.boxShadow = '0 0 5px 2px white'
						divs[i].classList.add('possibleJ', '18')

					}else{
						jumpPossible++
					}
				}
			}
		}

		if(turnBlack == true){

			if(divs[i].classList.contains('black')){

				if(i+7<63 && i+14<63 && divs[i+7].classList.contains('white') && divs[i+7].classList.contains('right')==false && divs[i+7].classList.contains('left')==false && divs[i+14].classList.contains('marked')==false){
					divs[i].firstChild.setAttribute('onclick', 'showMoves(this)')
					divs[i].firstChild.style.cursor = 'pointer'
					divs[i].firstChild.style.boxShadow = '0 0 5px 2px white'
					divs[i].classList.add('possibleJ', '14')

				}else{
					jumpPossible++
				}

				if(i+9<63 && i+18<63 && divs[i+9].classList.contains('white') && divs[i+9].classList.contains('right')==false && divs[i+9].classList.contains('left')==false && divs[i+18].classList.contains('marked')==false){
					divs[i].firstChild.setAttribute('onclick', 'showMoves(this)')
					divs[i].firstChild.style.cursor = 'pointer'
					divs[i].firstChild.style.boxShadow = '0 0 5px 2px white'
					divs[i].classList.add('possibleJ', '18')

				}else{
					jumpPossible++
				}

				if(divs[i].classList.contains('damaBlack') || divs[i].firstChild.classList.contains('lastMovedJumped')){

					if(i-7>0 && i-14>0 && divs[i-7].classList.contains('white') && divs[i-7].classList.contains('right')==false && divs[i-7].classList.contains('left')==false && divs[i-14].classList.contains('marked')==false){
						divs[i].firstChild.setAttribute('onclick', 'showMoves(this)')
						divs[i].firstChild.style.cursor = 'pointer'
						divs[i].firstChild.style.boxShadow = '0 0 5px 2px white'
						divs[i].classList.add('possibleJ', '-14')
					}else{
						jumpPossible++
					}

					if(i-9>0 && i-18>0 && divs[i-9].classList.contains('white') && divs[i-9].classList.contains('right')==false && divs[i-9].classList.contains('left')==false && divs[i-18].classList.contains('marked')==false){
						divs[i].firstChild.setAttribute('onclick', 'showMoves(this)')
						divs[i].firstChild.style.cursor = 'pointer'
						divs[i].firstChild.style.boxShadow = '0 0 5px 2px white'
						divs[i].classList.add('possibleJ', '-18')
					}else{
						jumpPossible++
					}
				}
			}
		}
	}

	if(g == 'sim'){

		if(f.classList.contains('possibleJ') && f.firstChild.classList.contains('lastMovedJumped') && justTurned==false){

			for(i=0; i<divs.length; i++){

				if(divs[i].firstChild.classList.contains('lastMovedJumped')==false){
					divs[i].firstChild.style.boxShadow = '0 0 0 0 white'
				}
			}
			
		}else{
			turnBlack = !turnBlack

			if(turnBlack==true){
				document.getElementById('turnDiv').innerHTML = "Black's turn"
			}else{
				document.getElementById('turnDiv').innerHTML = "White's turn"
			}
			resetAll()
			reset()
			setTimeout(possibleJump)
			jumpPossible = 0
		}

		onlyLastJumped(f)
	}

	setTimeout(function(){var possibleJ = document.getElementsByClassName('possibleJ')

				if(possibleJ.length==0){
					possibleMoves()
				}}, 10)
}
possibleJump()

function possibleMoves(){

	for(i=0; i<divs.length; i++){

		if(turnBlack !== true){

			if(divs[i].classList.contains('white')){

				if(i-7>0 && divs[i-7].classList.contains('white')==false && divs[i].classList.contains('right')==false && (divs[i-7].classList.contains('marked')==false && divs[i-7].classList.contains('cima')==false)){
					divs[i].firstChild.setAttribute('onclick', 'showMoves(this)')
					divs[i].firstChild.style.cursor = 'pointer'
					divs[i].classList.add('possible', '-7')
				}

				if(i-9>0 && divs[i-9].classList.contains('white')==false && divs[i].classList.contains('left')==false && (divs[i-9].classList.contains('marked')==false && divs[i-9].classList.contains('cima')==false)){
					divs[i].firstChild.setAttribute('onclick', 'showMoves(this)')
					divs[i].firstChild.style.cursor = 'pointer'
					divs[i].classList.add('possible', '-9')
				}

				if(divs[i].classList.contains('damaWhite')){

					if(i+7<63 && divs[i+7].classList.contains('white')==false && divs[i].classList.contains('left')==false && (divs[i+7].classList.contains('marked')==false && divs[i+7].classList.contains('baixo')==false)){
						divs[i].firstChild.setAttribute('onclick', 'showMoves(this)')
						divs[i].firstChild.style.cursor = 'pointer'
						divs[i].classList.add('possible', '7')
					}

					if(i+9<63 && divs[i+9].classList.contains('white')==false && divs[i].classList.contains('right')==false && (divs[i+9].classList.contains('marked')==false && divs[i+9].classList.contains('baixo')==false)){
						divs[i].firstChild.setAttribute('onclick', 'showMoves(this)')
						divs[i].firstChild.style.cursor = 'pointer'
						divs[i].classList.add('possible', '9')
					}
				}
			}
		}

		if(turnBlack == true){

			if(divs[i].classList.contains('black')){

				if(i+7<63 && divs[i+7].classList.contains('black')==false && divs[i].classList.contains('left')==false && (divs[i+7].classList.contains('marked')==false && divs[i+7].classList.contains('baixo')==false)){
					divs[i].firstChild.setAttribute('onclick', 'showMoves(this)')
					divs[i].firstChild.style.cursor = 'pointer'
					divs[i].classList.add('possible', '7')
				}

				if(i+9<63 && divs[i+9].classList.contains('black')==false && divs[i].classList.contains('right')==false && (divs[i+9].classList.contains('marked')==false && divs[i+9].classList.contains('baixo')==false)){
					divs[i].firstChild.setAttribute('onclick', 'showMoves(this)')
					divs[i].firstChild.style.cursor = 'pointer'
					divs[i].classList.add('possible', '9')
				}

				if(divs[i].classList.contains('damaBlack')){

					if(i-7>0 && divs[i-7].classList.contains('black')==false && divs[i].classList.contains('right')==false && (divs[i-7].classList.contains('marked')==false && divs[i-7].classList.contains('cima')==false)){
						divs[i].firstChild.setAttribute('onclick', 'showMoves(this)')
						divs[i].firstChild.style.cursor = 'pointer'
						divs[i].classList.add('possible', '-7')
					}

					if(i-9>0 && divs[i-9].classList.contains('black')==false && divs[i].classList.contains('left')==false && (divs[i-9].classList.contains('marked')==false && divs[i-9].classList.contains('cima')==false)){
						divs[i].firstChild.setAttribute('onclick', 'showMoves(this)')
						divs[i].firstChild.style.cursor = 'pointer'
						divs[i].classList.add('possible', '-9')
					}
				}
			}
		}

		if(divs[i].classList.contains('possible')==false){

			if(divs[i].firstChild.classList.contains('whitePiece') || divs[i].firstChild.classList.contains('blackPiece')){

			divs[i].firstChild.onclick = function(e){

				for(i=0; i<divs.length; i++){

					if((divs[i].classList.contains('possible') || divs[i].classList.contains('possibleJ')) && event.target.parentNode.parentNode.classList.contains('possibleCell')==false){
						divs[i].firstChild.style.boxShadow = '0 0 5px 2px white'
					}
				}

				for(i=0; i<possibleDashed.length; i++){
					
					if(possibleDashed[i].classList.contains('zeroOpacity')){
						possibleDashed[i].classList.remove('zeroOpacity')
					}
					possibleDashed[i].style.opacity = '0'
				}
			}
			}
		}

		if(divs[i].classList.contains('possibleCell')==false && divs[i].classList.contains('marked')==false){

			divs[i].onclick = function(e){

				for(i=0; i<divs.length; i++){

					if(divs[i].classList.contains('possibleCell')){
						divs[i].classList.remove('possibleCell')
						divs[i].removeAttribute('onclick')
					}

					if(divs[i].classList.contains('possible') || divs[i].classList.contains('possibleJ')){
						divs[i].firstChild.style.boxShadow = '0 0 5px 2px white'
					}
				}

				for(i=0; i<possibleDashed.length; i++){
					
					if(possibleDashed[i].classList.contains('zeroOpacity')){
						possibleDashed[i].classList.remove('zeroOpacity')
					}
					possibleDashed[i].style.opacity = '0'
				}
			}
		}
	}
}

function showMoves(pieceClicked){

	reset()

	for(i=0; i<divs.length; i++){

		if(divs[i].firstChild){
			divs[i].firstChild.style.boxShadow = '0 0 0 0 black'

			if(divs[i].firstChild.classList.contains('scaler')){
				divs[i].firstChild.style.animation = 'pulinho 1s ease-out 0.3s infinite'
			}
		}
	}

	for(i=0; i<possibleDashed.length; i++){
		
		if(possibleDashed[i].classList.contains('zeroOpacity')){
			possibleDashed[i].classList.remove('zeroOpacity')
		}
		possibleDashed[i].style.opacity = '0'
	}

	for(i=0; i<divs.length; i++){

		pieceClicked.parentNode.classList.add('clicked')

		if(divs[i].classList.contains('clicked')){

			divs[i].firstChild.style.boxShadow = '0 0 5px 2px white'

			if(divs[i].classList.contains('7')){
				console.log(divs[i+7].firstChild)
				divs[i+7].firstChild.firstChild.style.opacity = '1'
				divs[i+7].firstChild.style.animation = 'pulinho 1s ease-out 0.3s infinite, pulinhoo 0.3s ease-out'
				divs[i+7].classList.add('possibleCell', 'p7')
			}

			if(divs[i].classList.contains('9')){
				divs[i+9].firstChild.firstChild.style.opacity = '1'
				divs[i+9].firstChild.style.animation = 'pulinho 1s ease-out 0.3s infinite, pulinhoo 0.3s ease-out'
				divs[i+9].classList.add('possibleCell', 'p9')
			}

			if(divs[i].classList.contains('-7')){
				divs[i-7].firstChild.firstChild.style.opacity = '1'
				divs[i-7].firstChild.style.animation = 'pulinho 1s ease-out 0.3s infinite, pulinhoo 0.3s ease-out'
				divs[i-7].classList.add('possibleCell', 'p-7')
			}

			if(divs[i].classList.contains('-9')){
				divs[i-9].firstChild.firstChild.style.opacity = '1'
				divs[i-9].firstChild.style.animation = 'pulinho 1s ease-out 0.3s infinite, pulinhoo 0.3s ease-out'
				divs[i-9].classList.add('possibleCell', 'p-9')
			}

			if(divs[i].classList.contains('14')){
				divs[i+14].firstChild.firstChild.style.opacity = '1'
				divs[i+14].firstChild.style.animation = 'pulinho 1s ease-out 0.3s infinite, pulinhoo 0.3s ease-out'
				divs[i+14].classList.add('possibleCell', 'p14')
			}

			if(divs[i].classList.contains('18')){
				divs[i+18].firstChild.firstChild.style.opacity = '1'
				divs[i+18].firstChild.style.animation = 'pulinho 1s ease-out 0.3s infinite, pulinhoo 0.3s ease-out'
				divs[i+18].classList.add('possibleCell', 'p18')
			}

			if(divs[i].classList.contains('-14')){
				divs[i-14].firstChild.firstChild.style.opacity = '1'
				divs[i-14].firstChild.style.animation = 'pulinho 1s ease-out 0.3s infinite, pulinhoo 0.3s ease-out'
				divs[i-14].setAttribute('onclick', 'move(this)')
				divs[i-14].classList.add('possibleCell', 'p-14')
			}

			if(divs[i].classList.contains('-18')){
				divs[i-18].firstChild.firstChild.style.opacity = '1'
				divs[i-18].firstChild.style.animation = 'pulinho 1s ease-out 0.3s infinite, pulinhoo 0.3s ease-out'
				divs[i-18].setAttribute('onclick', 'move(this)')
				divs[i-18].classList.add('possibleCell', 'p-18')
			}

			for(i=0; i<divs.length; i++){

				if(divs[i].classList.contains('possibleCell')){
					divs[i].setAttribute('onclick', 'move(this)')
				}
			}
		}
	}
}

function move(possibleCellClicked){
	var dama
	
	for(i=0; i<possibleDashed.length; i++){
		possibleDashed[i].classList.add('zeroOpacity')
		possibleDashed[i].style.opacity = '0'
	}

	for(i=0; i<divs.length; i++){

		if(divs[i].classList.contains('clicked')){

			setTimeout(function(){

				for(i=0; i<divs.length; i++){

					if(divs[i].classList.contains('clicked')){
						divs[i].firstChild.removeAttribute('style')
						divs[i].firstChild.classList.remove('move')
						possibleCellClicked.prepend(divs[i].firstChild)
					}
				}
			}, 200)
			
			possibleCellClicked.removeAttribute('onclick')
		}
		if(divs[i].classList.contains('clicked')){

			if(possibleCellClicked.classList.contains('p-7') && divs[i].classList.contains('-7') && divs[i].classList.contains('clicked')){
				console.log(possibleCellClicked)
				divs[i].firstChild.style.boxShadow = '0 0 0 0 white'
				divs[i].firstChild.classList.add('move')
				divs[i].firstChild.style.transform = 'translate(62px, -62px)'
			}

			if(possibleCellClicked.classList.contains('p-9') && divs[i].classList.contains('-9') && divs[i].classList.contains('clicked')){
				console.log(possibleCellClicked)
				divs[i].firstChild.style.boxShadow = '0 0 0 0 white'
				divs[i].firstChild.classList.add('move')
				divs[i].firstChild.style.transform = 'translate(-62px, -62px)'
			}

			if(possibleCellClicked.classList.contains('p7') && divs[i+7].classList.contains('p7')){
				divs[i].firstChild.style.boxShadow = '0 0 0 0 white'
				divs[i].firstChild.classList.add('move')
				divs[i].firstChild.style.transform = 'translate(-62px, 62px)'
			}

			if(possibleCellClicked.classList.contains('p9') && divs[i+9].classList.contains('p9')){
				divs[i].firstChild.style.boxShadow = '0 0 0 0 white'
				divs[i].firstChild.classList.add('move')
				divs[i].firstChild.style.transform = 'translate(62px, 62px)'
			}

			if(possibleCellClicked.classList.contains('p18') && divs[i+18].classList.contains('p18')){
				var s = i
				divs[i].firstChild.style.boxShadow = '0 0 0 0 white'
				divs[i].firstChild.classList.add('lastMovedJumped', 'move')
				divs[i].firstChild.style.transform = 'translate(125px, 125px)'

				setTimeout(function(){
					divs[s+9].firstChild.style.transform = 'scale(0)'
					divs[s+9].className = 'cell'
				}, 100)

				setTimeout(function(){
					divs[s+9].firstChild.remove()
					point()
				}, 200)
			}

			if(possibleCellClicked.classList.contains('p14') && divs[i+14].classList.contains('p14')){
				var s = i
				divs[i].firstChild.style.boxShadow = '0 0 0 0 white'
				divs[i].firstChild.classList.add('lastMovedJumped', 'move')
				divs[i].firstChild.style.transform = 'translate(-125px, 125px)'

				setTimeout(function(){
					divs[s+7].firstChild.style.transform = 'scale(0)'
					divs[s+7].className = 'cell'
				}, 100)

				setTimeout(function(){
					divs[s+7].firstChild.remove()
					point()
				}, 200)
			}

			if(possibleCellClicked.classList.contains('p-18') && divs[i-18].classList.contains('p-18')){
				var s = i
				setTimeout(function(){
					divs[s].firstChild.style.boxShadow = '0 0 0 0 white'
					divs[s].firstChild.classList.add('lastMovedJumped', 'move')
					divs[s].firstChild.style.transform = 'translate(-125px, -125px)'}, 10, s)

				setTimeout(function(){
					divs[s-9].firstChild.style.transform = 'scale(0)'
					divs[s-9].className = 'cell'
				}, 100)

				setTimeout(function(){
					divs[s-9].firstChild.remove()
					point()
				}, 200)
			}

			if(possibleCellClicked.classList.contains('p-14') && divs[i-14].classList.contains('p-14')){
				var s = i
				setTimeout(function(){
					divs[s].firstChild.style.boxShadow = '0 0 0 0 white'
					divs[s].firstChild.classList.add('lastMovedJumped', 'move')
					divs[s].firstChild.style.transform = 'translate(125px, -125px)'}, 10, s)

				setTimeout(function(){
					divs[s-7].firstChild.style.transform = 'scale(0)'
					divs[s-7].className = 'cell'
				}, 100)

				setTimeout(function(){
					divs[s-7].firstChild.remove()
					point()
				}, 200)
			}
		}

		if(possibleCellClicked.classList.contains('top') && divs[i].classList.contains('white') && possibleCellClicked.firstChild.classList.contains('damaWhitePiece')==false){
			dama = 'white'
		}

		if(possibleCellClicked.classList.contains('bottom') && divs[i].classList.contains('black') && possibleCellClicked.firstChild.classList.contains('damaBlackPiece')==false){
			dama = 'black'
		}
	}

	setTimeout(function(){
		reset()
		resetAll()
	}, 210)
	
	setTimeout(possibleJump, 220, possibleCellClicked, 'sim', dama, false)
	jumpPossible = 0
}

function resetAll(){

	for(i=0; i<divs.length; i++){

		divs[i].classList.remove('possible')
		divs[i].classList.remove('possibleJ')

		if(divs[i].classList.contains('top') && divs[i].classList.contains('right')){
			divs[i].className = 'cell top right'

		}else if(divs[i].classList.contains('top') && divs[i].classList.contains('left')){
			divs[i].className = 'cell top left'

		}else if(divs[i].classList.contains('bottom') && divs[i].classList.contains('right')){
			divs[i].className = 'cell bottom right'

		}else if(divs[i].classList.contains('bottom') && divs[i].classList.contains('left')){
			divs[i].className = 'cell bottom left'

		}else if(divs[i].classList.contains('right')){
			divs[i].className = 'cell right'

		}else if(divs[i].classList.contains('top')){
			divs[i].className = 'cell top'

		}else if(divs[i].classList.contains('left')){
			divs[i].className = 'cell left'

		}else if(divs[i].classList.contains('bottom')){
			divs[i].className = 'cell bottom'
		}

		if(divs[i].classList.contains('top')==false && divs[i].classList.contains('bottom')==false && divs[i].classList.contains('left')==false && divs[i].classList.contains('right')==false){
			divs[i].className = 'cell'
		}

		if(divs[i].hasChildNodes()){

			divs[i].firstChild.removeAttribute('onclick')
			divs[i].firstChild.style.cursor = 'default'

			if(divs[i].firstChild.classList.contains('blackPiece')){
				divs[i].classList.add('black', 'marked')
			}

			if(divs[i].firstChild.classList.contains('damaBlackPiece')){
				divs[i].classList.add('black', 'damaBlack', 'marked')
			}

			if(divs[i].firstChild.classList.contains('whitePiece')){
				divs[i].classList.add('white', 'marked')
			}

			if(divs[i].firstChild.classList.contains('damaWhitePiece')){
				divs[i].classList.add('white', 'damaWhite', 'marked')
			}

			if(divs[i].classList.contains('damaWhite') && divs[i].firstChild.classList.contains('lastMovedJumped')==false){
				divs[i].firstChild.remove()
				damaWhitePieceClone = damaWhitePiece[0].cloneNode(true)
				divs[i].prepend(damaWhitePieceClone)
				divs[i].classList.add('marked')
			}

			if(divs[i].classList.contains('damaWhite') && divs[i].firstChild.classList.contains('lastMovedJumped')){
				divs[i].firstChild.remove()
				damaWhitePieceClone = damaWhitePiece[0].cloneNode(true)
				divs[i].prepend(damaWhitePieceClone)
				divs[i].classList.add('marked')
				divs[i].firstChild.classList.add('lastMovedJumped')
			}

			if(divs[i].classList.contains('damaBlack') && divs[i].firstChild.classList.contains('lastMovedJumped')==false){
				divs[i].firstChild.remove()
				damaBlackPieceClone = damaBlackPiece[0].cloneNode(true)
				divs[i].prepend(damaBlackPieceClone)
				divs[i].classList.add('marked')
			}

			if(divs[i].classList.contains('damaBlack') && divs[i].firstChild.classList.contains('lastMovedJumped')){
				divs[i].firstChild.remove()
				damaBlackPieceClone = damaBlackPiece[0].cloneNode(true)
				divs[i].prepend(damaBlackPieceClone)
				divs[i].classList.add('marked')
				divs[i].firstChild.classList.add('lastMovedJumped')
			}
		}
	}
}

function onlyLastJumped(f){

	for(i=0; i<divs.length; i++){

		if(divs[i].firstChild){

			if(divs[i].classList.contains('possibleJ')){

				if(divs[i].firstChild.classList.contains('lastMovedJumped')==false){
					divs[i].classList.remove('possibleJ')
					divs[i].style.backgroundColor = '#601c1c'
					divs[i].firstChild.removeAttribute('onclick')
					divs[i].firstChild.style.cursor = 'default'
				}
			}
		}
	}

	f.firstChild.classList.remove('lastMovedJumped')
}

function point(){

	if(turnBlack==false){
		whitePoints++
		blackPieceEatenClone = blackPieceEaten[0].cloneNode(true)
		blackEaten.appendChild(blackPieceEatenClone)

		if(whitePoints == 12){
			alert('White Wins!')
		}
	}

	if(turnBlack==true){
		blackPoints++
		whitePieceEatenClone = whitePieceEaten[0].cloneNode(true)
		whiteEaten.appendChild(whitePieceEatenClone)

		if(blackPoints == 12){
			alert('Black Wins!')
		}
	}
}