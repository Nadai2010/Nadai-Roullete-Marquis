# Configuración de las direcciones de cuenta y comandos de Katana
katana_command := katana ${config}
sozo_command := sozo build ${config}
sozo_command2 := sozo migrate ${config}
torii_command := torii ${config}

# Regla para conectarse a Katana
katana:
	${katana_command}
	
# Regla para ejecutar el comando Katana en una nueva terminal
sozo:
	sed -i -e '/world_address = "0x223b959926c92e10a5de78a76871fa40cefafbdce789137843df7c7b30e3e0"/d' ../dojo-starter/Scarb.toml
	${sozo_command}
	${sozo_command2}
	sleep 10
	echo 'world_address = "0x223b959926c92e10a5de78a76871fa40cefafbdce789137843df7c7b30e3e0"' >> Scarb.toml

torii:
	${torii_command}


# Regla para ejecutar el comando Sozo Build en una nueva terminal

all: 
	sed -i -e '/world_address = "0x223b959926c92e10a5de78a76871fa40cefafbdce789137843df7c7b30e3e0"/d' ../dojo-starter/Scarb.toml
	${sozo_command}
	${sozo_command2}
	sleep 10
	echo 'world_address = "0x223b959926c92e10a5de78a76871fa40cefafbdce789137843df7c7b30e3e0"' >> Scarb.toml
	${torii_command}