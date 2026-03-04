# Example Agent Implementation

class ExampleAgent:
    def __init__(self, name):
        self.name = name

    def greet(self):
        return f"Hello, my name is {self.name}!"

# Example usage
if __name__ == '__main__':
    agent = ExampleAgent("Agent Smith")
    print(agent.greet())