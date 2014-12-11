{
	"patcher" : 	{
		"fileversion" : 1,
		"appversion" : 		{
			"major" : 6,
			"minor" : 0,
			"revision" : 4
		}
,
		"rect" : [ 534.0, 48.0, 830.0, 746.0 ],
		"bglocked" : 0,
		"openinpresentation" : 0,
		"default_fontsize" : 12.0,
		"default_fontface" : 0,
		"default_fontname" : "Arial",
		"gridonopen" : 0,
		"gridsize" : [ 15.0, 15.0 ],
		"gridsnaponopen" : 0,
		"statusbarvisible" : 2,
		"toolbarvisible" : 1,
		"boxanimatetime" : 200,
		"imprint" : 0,
		"enablehscroll" : 1,
		"enablevscroll" : 1,
		"devicewidth" : 0.0,
		"description" : "",
		"digest" : "",
		"tags" : "",
		"boxes" : [ 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-21",
					"maxclass" : "number",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "int", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 968.0, 191.0, 50.0, 20.0 ]
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-9",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "signal" ],
					"patching_rect" : [ 926.0, 577.0, 88.0, 20.0 ],
					"text" : "poly~ whoa 16"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-71",
					"maxclass" : "number",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "int", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 629.25, 447.0, 50.0, 20.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-60",
					"maxclass" : "button",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "bang" ],
					"patching_rect" : [ 913.0, 285.0, 20.0, 20.0 ]
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-61",
					"maxclass" : "flonum",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "float", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 861.5, 447.0, 50.0, 20.0 ]
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-62",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 619.5, 498.0, 51.0, 18.0 ],
					"text" : "note $1"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-63",
					"maxclass" : "button",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "bang" ],
					"patching_rect" : [ 659.0, 363.0, 20.0, 20.0 ]
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-64",
					"maxclass" : "number",
					"maximum" : 1,
					"minimum" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "int", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 693.75, 321.0, 50.0, 20.0 ]
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-66",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "int" ],
					"patching_rect" : [ 638.0, 413.0, 32.5, 20.0 ],
					"text" : "+"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-67",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "int" ],
					"patching_rect" : [ 693.75, 363.0, 32.5, 20.0 ],
					"text" : "* 16"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-68",
					"maxclass" : "number",
					"maximum" : 16,
					"minimum" : 1,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "int", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 638.0, 321.0, 50.0, 20.0 ]
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-69",
					"maxclass" : "newobj",
					"numinlets" : 5,
					"numoutlets" : 2,
					"outlettype" : [ "signal", "signal" ],
					"patching_rect" : [ 638.0, 535.0, 128.0, 20.0 ],
					"text" : "poly~ ronald_playit 16"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-59",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 758.0, 132.0, 34.0, 20.0 ],
					"text" : "print"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-58",
					"maxclass" : "button",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "bang" ],
					"patching_rect" : [ 968.0, 96.0, 52.0, 52.0 ]
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-55",
					"maxclass" : "flonum",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "float", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 842.0, 230.0, 48.0, 20.0 ]
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-53",
					"maxclass" : "flonum",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "float", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 795.5, 230.0, 46.5, 20.0 ]
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-51",
					"maxclass" : "flonum",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "float", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 754.5, 230.0, 41.0, 20.0 ]
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-49",
					"maxclass" : "number",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "int", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 720.0, 230.0, 34.0, 20.0 ]
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-46",
					"maxclass" : "number",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "int", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 690.0, 230.0, 30.0, 20.0 ]
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-44",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 5,
					"outlettype" : [ "int", "int", "float", "float", "float" ],
					"patching_rect" : [ 709.0, 191.0, 173.0, 20.0 ],
					"text" : "unpack i i f f f"
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 1.0, 0.994077, 0.27404, 1.0 ],
					"fontname" : "Arial",
					"fontsize" : 18.0,
					"frgb" : [ 0.430678, 0.401019, 0.67951, 1.0 ],
					"id" : "obj-38",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 600.0, 33.0, 242.0, 27.0 ],
					"text" : "RESPONDING TO OSC!!!",
					"textcolor" : [ 0.430678, 0.401019, 0.67951, 1.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-34",
					"maxclass" : "button",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "bang" ],
					"patching_rect" : [ 563.0, 136.0, 52.0, 52.0 ]
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-36",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "signal" ],
					"patching_rect" : [ 563.0, 202.0, 91.0, 20.0 ],
					"text" : "poly~ knock 16"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"frgb" : [ 0.827671, 0.544408, 0.311287, 1.0 ],
					"id" : "obj-31",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 600.0, 68.0, 173.0, 20.0 ],
					"text" : "KNOCK / PHRASE / WHOA",
					"textcolor" : [ 0.827671, 0.544408, 0.311287, 1.0 ]
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-28",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 3,
					"outlettype" : [ "", "", "" ],
					"patching_rect" : [ 600.0, 96.0, 290.0, 20.0 ],
					"text" : "poly~ osc_router 1"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-19",
					"maxclass" : "button",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "bang" ],
					"patching_rect" : [ 516.0, 397.0, 20.0, 20.0 ]
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-11",
					"maxclass" : "flonum",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "float", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 486.0, 510.0, 50.0, 20.0 ]
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-30",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 278.0, 508.0, 51.0, 18.0 ],
					"text" : "note $1"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-27",
					"maxclass" : "button",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "bang" ],
					"patching_rect" : [ 278.0, 397.0, 20.0, 20.0 ]
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-22",
					"maxclass" : "number",
					"maximum" : 1,
					"minimum" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "int", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 333.75, 333.0, 50.0, 20.0 ]
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-17",
					"maxclass" : "newobj",
					"numinlets" : 3,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 389.5, 333.0, 130.5, 20.0 ],
					"text" : "pack 0. 0. 0."
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-15",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "int" ],
					"patching_rect" : [ 278.0, 425.0, 32.5, 20.0 ],
					"text" : "+"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-14",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "int" ],
					"patching_rect" : [ 300.5, 377.0, 32.5, 20.0 ],
					"text" : "* 16"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-13",
					"maxclass" : "number",
					"maximum" : 16,
					"minimum" : 1,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "int", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 278.0, 333.0, 50.0, 20.0 ]
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-10",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 638.5, 160.0, 273.0, 20.0 ],
					"text" : "/phrase playerIndex phraseIndex xVel yVel zVel"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-8",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 5,
					"outlettype" : [ "int", "int", "float", "float", "float" ],
					"patching_rect" : [ 278.0, 272.0, 242.0, 20.0 ],
					"text" : "unpack 0 0 0. 0. 0."
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-7",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"patching_rect" : [ 278.0, 213.0, 81.0, 20.0 ],
					"text" : "route /phrase"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-26",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 278.0, 136.0, 123.0, 20.0 ],
					"text" : "loadmess port 12349"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-2",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 278.0, 175.0, 69.0, 20.0 ],
					"text" : "udpreceive"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-6",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 148.5, 173.0, 32.5, 18.0 ],
					"text" : "1"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"frgb" : [ 0.015097, 0.575236, 0.909319, 1.0 ],
					"id" : "obj-20",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 148.5, 68.0, 29.0, 20.0 ],
					"text" : "GO",
					"textcolor" : [ 0.015097, 0.575236, 0.909319, 1.0 ]
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-16",
					"maxclass" : "number",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "int", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 148.5, 231.0, 50.0, 20.0 ]
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-12",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "int" ],
					"patching_rect" : [ 148.5, 211.0, 38.0, 20.0 ],
					"text" : "% 32"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-39",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "int" ],
					"patching_rect" : [ 148.5, 252.5, 32.5, 20.0 ],
					"text" : "+ 1"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-35",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "int" ],
					"patching_rect" : [ 148.5, 191.0, 32.5, 20.0 ],
					"text" : "+"
				}

			}
, 			{
				"box" : 				{
					"bordercolor" : [ 0.015097, 0.575236, 0.909319, 1.0 ],
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"hbgcolor" : [ 0.015097, 0.575236, 0.909319, 1.0 ],
					"id" : "obj-24",
					"maxclass" : "number",
					"maximum" : 32,
					"minimum" : 1,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "int", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 148.5, 272.0, 50.0, 20.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-3",
					"maxclass" : "toggle",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "int" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 148.5, 96.0, 20.0, 20.0 ]
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-1",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "bang" ],
					"patching_rect" : [ 148.5, 123.0, 71.0, 20.0 ],
					"text" : "metro 4000"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-5",
					"maxclass" : "ezdac~",
					"numinlets" : 2,
					"numoutlets" : 0,
					"patching_rect" : [ 555.5, 644.0, 45.0, 45.0 ]
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-4",
					"maxclass" : "newobj",
					"numinlets" : 5,
					"numoutlets" : 2,
					"outlettype" : [ "signal", "signal" ],
					"patching_rect" : [ 278.0, 547.0, 128.0, 20.0 ],
					"text" : "poly~ ronald_playit 16"
				}

			}
 ],
		"lines" : [ 			{
				"patchline" : 				{
					"destination" : [ "obj-6", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-1", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-4", 4 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-11", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-4", 1 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-11", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-16", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-12", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-15", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-13", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-15", 1 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-14", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-27", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-14", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-30", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-15", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-35", 1 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-16", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-39", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-16", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-4", 1 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-17", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-11", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-19", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-13", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-19", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-7", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-2", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-9", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-21", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-14", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-22", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-2", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-26", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-15", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-27", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-21", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-28", 2 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-34", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-28", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-44", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"midpoints" : [ 745.0, 147.0, 633.0, 147.0, 633.0, 183.0, 718.5, 183.0 ],
					"source" : [ "obj-28", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-58", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-28", 2 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-59", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-28", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-1", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-3", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-4", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-30", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-36", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-34", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-12", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-35", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-5", 1 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-36", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-5", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-36", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-24", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-39", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-46", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-44", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-49", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-44", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-51", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-44", 2 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-53", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-44", 3 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-55", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-44", 4 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-64", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-46", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-68", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-49", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-69", 2 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-51", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-69", 3 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-53", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-69", 4 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-55", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-35", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-6", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-61", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-60", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-68", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-60", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-69", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-62", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-66", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-63", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-67", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-64", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-71", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-66", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-63", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-67", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-66", 1 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-67", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-66", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-68", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-5", 1 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-69", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-5", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-69", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-8", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-7", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-62", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-71", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-13", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-8", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-17", 2 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-8", 4 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-17", 1 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-8", 3 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-17", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-8", 2 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-22", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-8", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-5", 1 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-9", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-5", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-9", 0 ]
				}

			}
 ],
		"parameters" : 		{
			"obj-69.4::obj-3.1::obj-30" : [ "gain~[69]", "gain~", 0 ],
			"obj-69.6::obj-3.1::obj-30" : [ "gain~[73]", "gain~", 0 ],
			"obj-69.7::obj-3.1::obj-42" : [ "flonum[37]", "flonum", 0 ],
			"obj-4.2::obj-16" : [ "toggle[2]", "toggle", 0 ],
			"obj-4.7::obj-3.1::obj-5" : [ "toggle[37]", "toggle[1]", 0 ],
			"obj-4.10::obj-3.1::obj-42" : [ "flonum[24]", "flonum", 0 ],
			"obj-69.8::obj-3.1::obj-5" : [ "toggle[55]", "toggle[1]", 0 ],
			"obj-4.15::obj-16" : [ "toggle[29]", "toggle", 0 ],
			"obj-69.9::obj-3.1::obj-30" : [ "gain~[79]", "gain~", 0 ],
			"obj-4.3::obj-16" : [ "toggle[4]", "toggle", 0 ],
			"obj-4.5::obj-3.1::obj-30" : [ "gain~[39]", "gain~", 0 ],
			"obj-4.10::obj-3.1::obj-10" : [ "gain~[49]", "gain~[1]", 0 ],
			"obj-69.10::obj-3.1::obj-30" : [ "gain~[81]", "gain~", 0 ],
			"obj-4.11::obj-3.1::obj-5" : [ "toggle[41]", "toggle[1]", 0 ],
			"obj-69.11::obj-16" : [ "toggle[62]", "toggle", 0 ],
			"obj-4.13::obj-3.1::obj-5" : [ "toggle[43]", "toggle[1]", 0 ],
			"obj-69.12::obj-16" : [ "toggle[64]", "toggle", 0 ],
			"obj-4.8::obj-3.1::obj-10" : [ "gain~[44]", "gain~[1]", 0 ],
			"obj-4.13::obj-3.1::obj-30" : [ "gain~[54]", "gain~", 0 ],
			"obj-69.1::obj-3.1::obj-5" : [ "toggle[47]", "toggle[1]", 0 ],
			"obj-69.13::obj-3.1::obj-10" : [ "gain~[86]", "gain~[1]", 0 ],
			"obj-4.3::obj-3.1::obj-10" : [ "gain~[34]", "gain~[1]", 0 ],
			"obj-4.7::obj-3.1::obj-10" : [ "gain~[42]", "gain~[1]", 0 ],
			"obj-69.2::obj-3.1::obj-42" : [ "flonum[32]", "flonum", 0 ],
			"obj-69.14::obj-3.1::obj-10" : [ "gain~[88]", "gain~[1]", 0 ],
			"obj-69.3::obj-3.1::obj-30" : [ "gain~[67]", "gain~", 0 ],
			"obj-69.5::obj-3.1::obj-5" : [ "toggle[25]", "toggle[1]", 0 ],
			"obj-69.15::obj-3.1::obj-42" : [ "flonum[45]", "flonum", 0 ],
			"obj-4.4::obj-3.1::obj-5" : [ "toggle[34]", "toggle[1]", 0 ],
			"obj-69.16::obj-3.1::obj-30" : [ "gain~[93]", "gain~", 0 ],
			"obj-4.5::obj-3.1::obj-42" : [ "flonum[19]", "flonum", 0 ],
			"obj-4.15::obj-3.1::obj-30" : [ "gain~[58]", "gain~", 0 ],
			"obj-69.6::obj-3.1::obj-10" : [ "gain~[72]", "gain~[1]", 0 ],
			"obj-69.7::obj-3.1::obj-5" : [ "toggle[53]", "toggle[1]", 0 ],
			"obj-4.1::obj-3.1::obj-30" : [ "gain~", "gain~", 0 ],
			"obj-69.8::obj-3.1::obj-42" : [ "flonum[38]", "flonum", 0 ],
			"obj-4.8::obj-3.1::obj-42" : [ "flonum[22]", "flonum", 0 ],
			"obj-69.5::obj-3.1::obj-10" : [ "gain~[70]", "gain~[1]", 0 ],
			"obj-69.9::obj-3.1::obj-10" : [ "gain~[78]", "gain~[1]", 0 ],
			"obj-4.10::obj-3.1::obj-30" : [ "gain~[48]", "gain~", 0 ],
			"obj-69.6::obj-16" : [ "toggle[27]", "toggle", 0 ],
			"obj-69.10::obj-3.1::obj-42" : [ "flonum[40]", "flonum", 0 ],
			"obj-69.11::obj-3.1::obj-42" : [ "flonum[41]", "flonum", 0 ],
			"obj-4.15::obj-3.1::obj-42" : [ "flonum[29]", "flonum", 0 ],
			"obj-69.12::obj-3.1::obj-42" : [ "flonum[42]", "flonum", 0 ],
			"obj-4.9::obj-3.1::obj-30" : [ "gain~[46]", "gain~", 0 ],
			"obj-4.16::obj-16" : [ "toggle[31]", "toggle", 0 ],
			"obj-4.6::obj-3.1::obj-5" : [ "toggle[36]", "toggle[1]", 0 ],
			"obj-69.13::obj-16" : [ "toggle[66]", "toggle", 0 ],
			"obj-4.1::obj-3.1::obj-5" : [ "toggle[1]", "toggle[1]", 0 ],
			"obj-4.2::obj-3.1::obj-10" : [ "gain~[32]", "gain~[1]", 0 ],
			"obj-4.15::obj-3.1::obj-5" : [ "toggle[45]", "toggle[1]", 0 ],
			"obj-69.2::obj-3.1::obj-5" : [ "toggle[49]", "toggle[1]", 0 ],
			"obj-69.14::obj-16" : [ "toggle[68]", "toggle", 0 ],
			"obj-4.3::obj-3.1::obj-42" : [ "flonum[17]", "flonum", 0 ],
			"obj-69.3::obj-3.1::obj-10" : [ "gain~[66]", "gain~[1]", 0 ],
			"obj-69.15::obj-3.1::obj-10" : [ "gain~[90]", "gain~[1]", 0 ],
			"obj-4.14::obj-16" : [ "toggle[26]", "toggle", 0 ],
			"obj-69.5::obj-16" : [ "toggle[51]", "toggle", 0 ],
			"obj-69.16::obj-3.1::obj-5" : [ "toggle[71]", "toggle[1]", 0 ],
			"obj-4.12::obj-3.1::obj-10" : [ "gain~[52]", "gain~[1]", 0 ],
			"obj-69.5::obj-3.1::obj-42" : [ "flonum[35]", "flonum", 0 ],
			"obj-4.4::obj-3.1::obj-30" : [ "gain~[36]", "gain~", 0 ],
			"obj-4.5::obj-16" : [ "toggle[9]", "toggle", 0 ],
			"obj-4.12::obj-16" : [ "toggle[23]", "toggle", 0 ],
			"obj-4.16::obj-3.1::obj-42" : [ "flonum[30]", "flonum", 0 ],
			"obj-69.4::obj-3.1::obj-5" : [ "toggle[13]", "toggle[1]", 0 ],
			"obj-69.7::obj-16" : [ "toggle[54]", "toggle", 0 ],
			"obj-4.4::obj-3.1::obj-10" : [ "gain~[37]", "gain~[1]", 0 ],
			"obj-4.6::obj-16" : [ "toggle[10]", "toggle", 0 ],
			"obj-4.11::obj-16" : [ "toggle[21]", "toggle", 0 ],
			"obj-69.8::obj-3.1::obj-10" : [ "gain~[76]", "gain~[1]", 0 ],
			"obj-4.1::obj-3.1::obj-10" : [ "gain~[1]", "gain~[1]", 0 ],
			"obj-4.12::obj-3.1::obj-42" : [ "flonum[26]", "flonum", 0 ],
			"obj-4.15::obj-3.1::obj-10" : [ "gain~[59]", "gain~[1]", 0 ],
			"obj-69.2::obj-3.1::obj-10" : [ "gain~[64]", "gain~[1]", 0 ],
			"obj-69.9::obj-3.1::obj-5" : [ "toggle[57]", "toggle[1]", 0 ],
			"obj-69.9::obj-3.1::obj-42" : [ "flonum[39]", "flonum", 0 ],
			"obj-69.10::obj-3.1::obj-10" : [ "gain~[80]", "gain~[1]", 0 ],
			"obj-69.11::obj-3.1::obj-10" : [ "gain~[82]", "gain~[1]", 0 ],
			"obj-4.6::obj-3.1::obj-30" : [ "gain~[40]", "gain~", 0 ],
			"obj-4.7::obj-3.1::obj-42" : [ "flonum[21]", "flonum", 0 ],
			"obj-69.12::obj-3.1::obj-30" : [ "gain~[85]", "gain~", 0 ],
			"obj-4.14::obj-3.1::obj-5" : [ "toggle[44]", "toggle[1]", 0 ],
			"obj-69.13::obj-3.1::obj-30" : [ "gain~[87]", "gain~", 0 ],
			"obj-4.14::obj-3.1::obj-10" : [ "gain~[56]", "gain~[1]", 0 ],
			"obj-69.1::obj-3.1::obj-30" : [ "gain~[63]", "gain~", 0 ],
			"obj-69.14::obj-3.1::obj-42" : [ "flonum[44]", "flonum", 0 ],
			"obj-4.9::obj-16" : [ "toggle[16]", "toggle", 0 ],
			"obj-4.14::obj-3.1::obj-30" : [ "gain~[57]", "gain~", 0 ],
			"obj-69.15::obj-16" : [ "toggle[70]", "toggle", 0 ],
			"obj-4.9::obj-3.1::obj-5" : [ "toggle[39]", "toggle[1]", 0 ],
			"obj-4.10::obj-16" : [ "toggle[18]", "toggle", 0 ],
			"obj-69.16::obj-16" : [ "toggle[72]", "toggle", 0 ],
			"obj-4.4::obj-3.1::obj-42" : [ "flonum[18]", "flonum", 0 ],
			"obj-4.11::obj-3.1::obj-10" : [ "gain~[51]", "gain~[1]", 0 ],
			"obj-69.7::obj-3.1::obj-30" : [ "gain~[75]", "gain~", 0 ],
			"obj-4.13::obj-3.1::obj-42" : [ "flonum[27]", "flonum", 0 ],
			"obj-4.13::obj-16" : [ "toggle[24]", "toggle", 0 ],
			"obj-69.8::obj-16" : [ "toggle[56]", "toggle", 0 ],
			"obj-4.5::obj-3.1::obj-10" : [ "gain~[38]", "gain~[1]", 0 ],
			"obj-4.12::obj-3.1::obj-30" : [ "gain~[53]", "gain~", 0 ],
			"obj-4.16::obj-3.1::obj-30" : [ "gain~[61]", "gain~", 0 ],
			"obj-69.3::obj-16" : [ "toggle[11]", "toggle", 0 ],
			"obj-69.9::obj-16" : [ "toggle[58]", "toggle", 0 ],
			"obj-4.6::obj-3.1::obj-42" : [ "flonum[20]", "flonum", 0 ],
			"obj-69.2::obj-3.1::obj-30" : [ "gain~[65]", "gain~", 0 ],
			"obj-69.5::obj-3.1::obj-30" : [ "gain~[71]", "gain~", 0 ],
			"obj-69.10::obj-3.1::obj-5" : [ "toggle[59]", "toggle[1]", 0 ],
			"obj-4.6::obj-3.1::obj-10" : [ "gain~[41]", "gain~[1]", 0 ],
			"obj-69.11::obj-3.1::obj-5" : [ "toggle[61]", "toggle[1]", 0 ],
			"obj-69.12::obj-3.1::obj-5" : [ "toggle[63]", "toggle[1]", 0 ],
			"obj-69.16::obj-3.1::obj-42" : [ "flonum[46]", "flonum", 0 ],
			"obj-4.9::obj-3.1::obj-10" : [ "gain~[47]", "gain~[1]", 0 ],
			"obj-69.4::obj-16" : [ "toggle[14]", "toggle", 0 ],
			"obj-69.13::obj-3.1::obj-5" : [ "toggle[65]", "toggle[1]", 0 ],
			"obj-4.1::obj-16" : [ "toggle", "toggle", 0 ],
			"obj-4.8::obj-16" : [ "toggle[15]", "toggle", 0 ],
			"obj-4.14::obj-3.1::obj-42" : [ "flonum[28]", "flonum", 0 ],
			"obj-69.1::obj-3.1::obj-42" : [ "flonum[31]", "flonum", 0 ],
			"obj-69.1::obj-16" : [ "toggle[48]", "toggle", 0 ],
			"obj-69.14::obj-3.1::obj-30" : [ "gain~[89]", "gain~", 0 ],
			"obj-4.2::obj-3.1::obj-5" : [ "toggle[32]", "toggle[1]", 0 ],
			"obj-69.3::obj-3.1::obj-5" : [ "toggle[50]", "toggle[1]", 0 ],
			"obj-69.15::obj-3.1::obj-5" : [ "toggle[69]", "toggle[1]", 0 ],
			"obj-4.2::obj-3.1::obj-30" : [ "gain~[33]", "gain~", 0 ],
			"obj-69.4::obj-3.1::obj-42" : [ "flonum[34]", "flonum", 0 ],
			"obj-4.3::obj-3.1::obj-30" : [ "gain~[35]", "gain~", 0 ],
			"obj-4.5::obj-3.1::obj-5" : [ "toggle[35]", "toggle[1]", 0 ],
			"obj-4.7::obj-16" : [ "toggle[12]", "toggle", 0 ],
			"obj-69.6::obj-3.1::obj-5" : [ "toggle[52]", "toggle[1]", 0 ],
			"obj-69.7::obj-3.1::obj-10" : [ "gain~[74]", "gain~[1]", 0 ],
			"obj-69.6::obj-3.1::obj-42" : [ "flonum[36]", "flonum", 0 ],
			"obj-69.8::obj-3.1::obj-30" : [ "gain~[77]", "gain~", 0 ],
			"obj-4.8::obj-3.1::obj-5" : [ "toggle[38]", "toggle[1]", 0 ],
			"obj-4.11::obj-3.1::obj-42" : [ "flonum[25]", "flonum", 0 ],
			"obj-4.4::obj-16" : [ "toggle[6]", "toggle", 0 ],
			"obj-4.11::obj-3.1::obj-30" : [ "gain~[50]", "gain~", 0 ],
			"obj-4.16::obj-3.1::obj-10" : [ "gain~[60]", "gain~[1]", 0 ],
			"obj-4.10::obj-3.1::obj-5" : [ "toggle[40]", "toggle[1]", 0 ],
			"obj-69.1::obj-3.1::obj-10" : [ "gain~[62]", "gain~[1]", 0 ],
			"obj-69.10::obj-16" : [ "toggle[60]", "toggle", 0 ],
			"obj-4.16::obj-3.1::obj-5" : [ "toggle[46]", "toggle[1]", 0 ],
			"obj-69.11::obj-3.1::obj-30" : [ "gain~[83]", "gain~", 0 ],
			"obj-4.1::obj-3.1::obj-42" : [ "flonum", "flonum", 0 ],
			"obj-4.9::obj-3.1::obj-42" : [ "flonum[23]", "flonum", 0 ],
			"obj-4.12::obj-3.1::obj-5" : [ "toggle[42]", "toggle[1]", 0 ],
			"obj-69.12::obj-3.1::obj-10" : [ "gain~[84]", "gain~[1]", 0 ],
			"obj-4.13::obj-3.1::obj-10" : [ "gain~[55]", "gain~[1]", 0 ],
			"obj-69.2::obj-16" : [ "toggle[7]", "toggle", 0 ],
			"obj-69.13::obj-3.1::obj-42" : [ "flonum[43]", "flonum", 0 ],
			"obj-4.2::obj-3.1::obj-42" : [ "flonum[16]", "flonum", 0 ],
			"obj-4.8::obj-3.1::obj-30" : [ "gain~[45]", "gain~", 0 ],
			"obj-69.14::obj-3.1::obj-5" : [ "toggle[67]", "toggle[1]", 0 ],
			"obj-4.3::obj-3.1::obj-5" : [ "toggle[33]", "toggle[1]", 0 ],
			"obj-69.3::obj-3.1::obj-42" : [ "flonum[33]", "flonum", 0 ],
			"obj-69.15::obj-3.1::obj-30" : [ "gain~[91]", "gain~", 0 ],
			"obj-4.7::obj-3.1::obj-30" : [ "gain~[43]", "gain~", 0 ],
			"obj-69.4::obj-3.1::obj-10" : [ "gain~[68]", "gain~[1]", 0 ],
			"obj-69.16::obj-3.1::obj-10" : [ "gain~[92]", "gain~[1]", 0 ]
		}
,
		"dependency_cache" : [ 			{
				"name" : "ronald_playit.maxpat",
				"bootpath" : "/Users/Dylan/Documents/Projects/tony-ronald/patches",
				"patcherrelativepath" : "",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "ronald_doppler.maxpat",
				"bootpath" : "/Users/Dylan/Documents/Projects/tony-ronald/patches",
				"patcherrelativepath" : "",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "ronald_verb.maxpat",
				"bootpath" : "/Users/Dylan/Documents/Projects/tony-ronald/patches",
				"patcherrelativepath" : "",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "ronald_pan.maxpat",
				"bootpath" : "/Users/Dylan/Documents/Projects/tony-ronald/patches",
				"patcherrelativepath" : "",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "osc_router.maxpat",
				"bootpath" : "/Users/Dylan/Documents/Projects/tony-ronald/patches",
				"patcherrelativepath" : "",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "knock.maxpat",
				"bootpath" : "/Users/Dylan/Documents/Projects/tony-ronald/patches",
				"patcherrelativepath" : "",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "nw.gverb~.mxo",
				"type" : "iLaX"
			}
,           {
				"name" : "whoa.maxpat",
				"bootpath" : "/Users/Dylan/Documents/Projects/tony-ronald/patches",
				"patcherrelativepath" : ".",
				"type" : "JSON",
				"implicit" : 1
			}
 ]
	}

}
