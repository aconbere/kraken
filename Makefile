.PHONY : build
build :
		echo "Building Kraken."
		mkdir -p build
		cat lib/kraken.js lib/kraken/* > build/kraken.js
		echo "Done, see build/kraken.js"

.PHONY : clean
clean :
		echo "Removing Kraken build files."
		rm -rf ./build
