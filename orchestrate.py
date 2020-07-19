import os, sys, subprocess, time

flag = sys.argv[1]

if (flag == "initial"):

    print(os.environ["VARNAME"])
    subprocess.call(["echo","\n -----------------------------------------"])
    # subprocess.call(["echo","Installing pip requirements ..."])
    # subprocess.call(["echo","-----------------------------------------\n "])
    # subprocess.call(["pip","install","-r","requirements.txt"])

    # subprocess.call(["echo","\n -----------------------------------------"])
    # subprocess.call(["echo","Installing npm dependency"])
    # subprocess.call(["echo","-----------------------------------------\n "])
    # subprocess.call(["cd","positweet/"])
    # subprocess.call(["npm","install"])

    # subprocess.call(["echo","\n -----------------------------------------"])
    # subprocess.call(["echo","Building React files"])
    # subprocess.call(["echo","-----------------------------------------\n "])
    # subprocess.call(["npm", "run", "dev"])

    # subprocess.call(["python", "positweet/manage.py", "runserver"])

