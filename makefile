install-dependencies:
	@echo "Installing dependencies..."
	@npm install
	@echo "Dependencies installed."

run-unit-tests:
	@echo "Running unit tests..."
	@npm run test:unit
	@echo "Unit tests passed."

run-integration-tests:
	@echo "Running integration tests..."
	@node --run test:integration
	@echo "Integration tests passed."

run-all-tests:
	@echo "Running all tests..."
	@node --run test:all
	@echo "Unit & integration tests passed."

all:
	@echo "Running all..."
	@make install-dependencies
	@make run-all-tests
	@echo "All done."