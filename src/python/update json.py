import sys
import json
import os


def read_file(file):
    if os.path.exists(file):
        with open(file, "r") as f:
            return f.read()
    else:
        return f"Error: {file} does not exist."


def main():
    files = "src/posts/*.md"

    result = {}
    for file in files:
        result[file] = read_file(file).split()
    print(result)


if __name__ == "__main__":

    main()
