using System;

namespace Locker
{
	public partial class LockerWindow : Gtk.Window
	{
		public LockerWindow () : 
				base(Gtk.WindowType.Toplevel)
		{
			this.Build ();
		}

		protected void Confirmar (object sender, EventArgs e)
		{
			string endpoint = "http://10.0.164.253:3000/v1/code/586807802b4ec1093bdedd66/1234";
			RestClient client = new RestClient (
				endpoint,
				HttpVerb.POST);
			string result = client.MakeRequest ();
			ResultLabel.Text = result;
		}
	}
}

