from Tkinter import *

def frame(root, side):
    w = Frame(root)
    w.pack(side=side, expand=YES, fill=BOTH)
    return w

def button(root, side, text, command=None):
    w = Button(root, text=text, command=command)
    w.pack(side=side, expand=YES, fill=BOTH)
    return w

class LockerKeyboard(Frame):
    def __init__(self):
        Frame.__init__(self)
        self.pack(expand=YES, fill=BOTH)
        self.master.title('Locker Client Application')
        self.master.iconname("locker")

        display = StringVar()
        Entry(self, relief=SUNKEN, width=10, textvariable=display).pack(side=TOP, expand=YES, fill=BOTH)

        for key in ("123", "456", "789", "*0#"):
            keyF = frame(self, TOP)
            for char in key:
                button(keyF, LEFT, char, lambda w=display, s='%s' % char: w.set(w.get()+s))

        confirm = frame(self, BOTTOM)
        button(confirm, LEFT, 'Confirma', lambda w=display: w.set(''))

    def calc(self, display):
        try:
            display.set(`eval(display.get())`)
        except ValueError:
            display.set("ERROR")


if __name__ == '__main__':
    LockerKeyboard().mainloop()