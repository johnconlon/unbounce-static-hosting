import sys

def list_to_arr(filename, title):
  with open(filename, 'r') as sd:
    count = 0
    line_max = 4
    sys.stdout.write("  // %s\n  " % title)
    for line in sd:
      sys.stdout.write(line.strip() + ', ')
      count += 1
      if count == line_max:
        sys.stdout.write('\n  ')
        count = 0
    sys.stdout.write("\n")
      
list_to_arr('sdzip', 'San Diego')
list_to_arr('inlandzip', 'Inland')
list_to_arr('eastlazip', 'East LA')
list_to_arr('lazip', 'LA')
list_to_arr('oczip', 'Orange County')
list_to_arr('venturazip', 'Ventura')
