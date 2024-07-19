import subprocess

from colorama import Fore, Style


def format_code():
    try:
        subprocess.run(['git', 'add', '.'], check=True)
        print(Style.BRIGHT + Fore.GREEN + 'Successfully added all files to staging.')
        print("Running pre-commit hooks to format code...\n")
        subprocess.run(['pre-commit', 'run', '--all-files'])
        print(Style.BRIGHT + Fore.GREEN + 'Successfully formatted code.')
    except subprocess.CalledProcessError as e:
        print(Style.BRIGHT + Fore.RED + f'Error: {e}')
    finally:
        subprocess.run(['git', 'reset'], check=True)
        print(Style.BRIGHT + Fore.GREEN + 'Successfully reverted changes from staging.')


if __name__ == '__main__':
    format_code()
