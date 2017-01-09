using System;
using Gtk;

namespace Locker
{
	class MainClass
	{
		public static void Main (string[] args)
		{
			Application.Init ();
			LockerWindow win = new LockerWindow ();
			win.Show ();
			Application.Run ();
		}
	}
}
