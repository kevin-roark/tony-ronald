{
	"patcher" : 	{
		"fileversion" : 1,
		"appversion" : 		{
			"major" : 6,
			"minor" : 1,
			"revision" : 8,
			"architecture" : "x86"
		}
,
		"rect" : [ 280.0, 75.0, 1032.0, 746.0 ],
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
					"id" : "obj-34",
					"maxclass" : "button",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "bang" ],
					"patching_rect" : [ 600.0, 136.0, 52.0, 52.0 ]
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
					"patching_rect" : [ 600.0, 202.0, 126.0, 20.0 ],
					"text" : "poly~ knock_playit 16"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"frgb" : 0.0,
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
					"patching_rect" : [ 600.0, 96.0, 242.0, 20.0 ],
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
					"frgb" : 0.0,
					"id" : "obj-10",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 292.0, 252.0, 273.0, 20.0 ],
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
					"frgb" : 0.0,
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
					"patching_rect" : [ 319.5, 614.0, 45.0, 45.0 ]
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
					"destination" : [ "obj-34", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-28", 0 ]
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
					"destination" : [ "obj-24", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-39", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-5", 1 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-4", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-5", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-4", 0 ]
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
					"destination" : [ "obj-8", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-7", 0 ]
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
 ],
		"parameters" : 		{
			"obj-4.3::obj-3.1::obj-10" : [ "gain~[34]", "gain~[1]", 0 ],
			"obj-4.13::obj-16" : [ "toggle[24]", "toggle", 0 ],
			"obj-4.16::obj-16" : [ "toggle[31]", "toggle", 0 ],
			"obj-4.4::obj-16" : [ "toggle[6]", "toggle", 0 ],
			"obj-4.14::obj-3.1::obj-10" : [ "gain~[56]", "gain~[1]", 0 ],
			"obj-4.5::obj-3.1::obj-10" : [ "gain~[38]", "gain~[1]", 0 ],
			"obj-4.15::obj-3.1::obj-10" : [ "gain~[59]", "gain~[1]", 0 ],
			"obj-4.6::obj-3.1::obj-30" : [ "gain~[40]", "gain~", 0 ],
			"obj-4.7::obj-3.1::obj-30" : [ "gain~[43]", "gain~", 0 ],
			"obj-4.8::obj-3.1::obj-5" : [ "toggle[38]", "toggle[1]", 0 ],
			"obj-4.9::obj-16" : [ "toggle[16]", "toggle", 0 ],
			"obj-4.10::obj-3.1::obj-10" : [ "gain~[49]", "gain~[1]", 0 ],
			"obj-4.11::obj-3.1::obj-10" : [ "gain~[51]", "gain~[1]", 0 ],
			"obj-4.2::obj-3.1::obj-42" : [ "flonum[16]", "flonum", 0 ],
			"obj-4.12::obj-3.1::obj-30" : [ "gain~[53]", "gain~", 0 ],
			"obj-4.3::obj-3.1::obj-42" : [ "flonum[17]", "flonum", 0 ],
			"obj-4.13::obj-3.1::obj-10" : [ "gain~[55]", "gain~[1]", 0 ],
			"obj-4.16::obj-3.1::obj-5" : [ "toggle[46]", "toggle[1]", 0 ],
			"obj-4.4::obj-3.1::obj-10" : [ "gain~[37]", "gain~[1]", 0 ],
			"obj-4.1::obj-16" : [ "toggle", "toggle", 0 ],
			"obj-4.14::obj-16" : [ "toggle[26]", "toggle", 0 ],
			"obj-4.5::obj-16" : [ "toggle[9]", "toggle", 0 ],
			"obj-4.1::obj-3.1::obj-5" : [ "toggle[1]", "toggle[1]", 0 ],
			"obj-4.6::obj-3.1::obj-10" : [ "gain~[41]", "gain~[1]", 0 ],
			"obj-4.7::obj-3.1::obj-5" : [ "toggle[37]", "toggle[1]", 0 ],
			"obj-4.8::obj-3.1::obj-30" : [ "gain~[45]", "gain~", 0 ],
			"obj-4.9::obj-3.1::obj-30" : [ "gain~[46]", "gain~", 0 ],
			"obj-4.10::obj-16" : [ "toggle[18]", "toggle", 0 ],
			"obj-4.11::obj-3.1::obj-42" : [ "flonum[25]", "flonum", 0 ],
			"obj-4.2::obj-3.1::obj-5" : [ "toggle[32]", "toggle[1]", 0 ],
			"obj-4.12::obj-3.1::obj-10" : [ "gain~[52]", "gain~[1]", 0 ],
			"obj-4.1::obj-3.1::obj-42" : [ "flonum", "flonum", 0 ],
			"obj-4.3::obj-3.1::obj-5" : [ "toggle[33]", "toggle[1]", 0 ],
			"obj-4.13::obj-3.1::obj-5" : [ "toggle[43]", "toggle[1]", 0 ],
			"obj-4.16::obj-3.1::obj-30" : [ "gain~[61]", "gain~", 0 ],
			"obj-4.4::obj-3.1::obj-42" : [ "flonum[18]", "flonum", 0 ],
			"obj-4.14::obj-3.1::obj-5" : [ "toggle[44]", "toggle[1]", 0 ],
			"obj-4.5::obj-3.1::obj-30" : [ "gain~[39]", "gain~", 0 ],
			"obj-4.6::obj-16" : [ "toggle[10]", "toggle", 0 ],
			"obj-4.7::obj-3.1::obj-42" : [ "flonum[21]", "flonum", 0 ],
			"obj-4.1::obj-3.1::obj-30" : [ "gain~", "gain~", 0 ],
			"obj-4.8::obj-3.1::obj-42" : [ "flonum[22]", "flonum", 0 ],
			"obj-4.9::obj-3.1::obj-10" : [ "gain~[47]", "gain~[1]", 0 ],
			"obj-4.10::obj-3.1::obj-30" : [ "gain~[48]", "gain~", 0 ],
			"obj-4.11::obj-16" : [ "toggle[21]", "toggle", 0 ],
			"obj-4.2::obj-16" : [ "toggle[2]", "toggle", 0 ],
			"obj-4.12::obj-3.1::obj-42" : [ "flonum[26]", "flonum", 0 ],
			"obj-4.15::obj-3.1::obj-42" : [ "flonum[29]", "flonum", 0 ],
			"obj-4.3::obj-3.1::obj-30" : [ "gain~[35]", "gain~", 0 ],
			"obj-4.13::obj-3.1::obj-30" : [ "gain~[54]", "gain~", 0 ],
			"obj-4.16::obj-3.1::obj-10" : [ "gain~[60]", "gain~[1]", 0 ],
			"obj-4.4::obj-3.1::obj-5" : [ "toggle[34]", "toggle[1]", 0 ],
			"obj-4.14::obj-3.1::obj-42" : [ "flonum[28]", "flonum", 0 ],
			"obj-4.5::obj-3.1::obj-42" : [ "flonum[19]", "flonum", 0 ],
			"obj-4.15::obj-3.1::obj-5" : [ "toggle[45]", "toggle[1]", 0 ],
			"obj-4.6::obj-3.1::obj-42" : [ "flonum[20]", "flonum", 0 ],
			"obj-4.7::obj-16" : [ "toggle[12]", "toggle", 0 ],
			"obj-4.8::obj-3.1::obj-10" : [ "gain~[44]", "gain~[1]", 0 ],
			"obj-4.9::obj-3.1::obj-5" : [ "toggle[39]", "toggle[1]", 0 ],
			"obj-4.10::obj-3.1::obj-42" : [ "flonum[24]", "flonum", 0 ],
			"obj-4.11::obj-3.1::obj-30" : [ "gain~[50]", "gain~", 0 ],
			"obj-4.2::obj-3.1::obj-10" : [ "gain~[32]", "gain~[1]", 0 ],
			"obj-4.1::obj-3.1::obj-10" : [ "gain~[1]", "gain~[1]", 0 ],
			"obj-4.12::obj-16" : [ "toggle[23]", "toggle", 0 ],
			"obj-4.15::obj-16" : [ "toggle[29]", "toggle", 0 ],
			"obj-4.3::obj-16" : [ "toggle[4]", "toggle", 0 ],
			"obj-4.13::obj-3.1::obj-42" : [ "flonum[27]", "flonum", 0 ],
			"obj-4.16::obj-3.1::obj-42" : [ "flonum[30]", "flonum", 0 ],
			"obj-4.4::obj-3.1::obj-30" : [ "gain~[36]", "gain~", 0 ],
			"obj-4.14::obj-3.1::obj-30" : [ "gain~[57]", "gain~", 0 ],
			"obj-4.5::obj-3.1::obj-5" : [ "toggle[35]", "toggle[1]", 0 ],
			"obj-4.15::obj-3.1::obj-30" : [ "gain~[58]", "gain~", 0 ],
			"obj-4.6::obj-3.1::obj-5" : [ "toggle[36]", "toggle[1]", 0 ],
			"obj-4.7::obj-3.1::obj-10" : [ "gain~[42]", "gain~[1]", 0 ],
			"obj-4.8::obj-16" : [ "toggle[15]", "toggle", 0 ],
			"obj-4.9::obj-3.1::obj-42" : [ "flonum[23]", "flonum", 0 ],
			"obj-4.10::obj-3.1::obj-5" : [ "toggle[40]", "toggle[1]", 0 ],
			"obj-4.11::obj-3.1::obj-5" : [ "toggle[41]", "toggle[1]", 0 ],
			"obj-4.2::obj-3.1::obj-30" : [ "gain~[33]", "gain~", 0 ],
			"obj-4.12::obj-3.1::obj-5" : [ "toggle[42]", "toggle[1]", 0 ]
		}
,
		"dependency_cache" : [ 			{
				"name" : "ronald_playit.maxpat",
				"bootpath" : "/Users/kevinroark/code/art/tony/tony-ronald/patches",
				"patcherrelativepath" : ".",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "ronald_doppler.maxpat",
				"bootpath" : "/Users/kevinroark/code/art/tony/tony-ronald/patches",
				"patcherrelativepath" : ".",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "ronald_verb.maxpat",
				"bootpath" : "/Users/kevinroark/code/art/tony/tony-ronald/patches",
				"patcherrelativepath" : ".",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "osc_router.maxpat",
				"bootpath" : "/Users/kevinroark/code/art/tony/tony-ronald/patches",
				"patcherrelativepath" : ".",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "knock_playit.maxpat",
				"bootpath" : "/Users/kevinroark/code/art/tony/tony-ronald/patches",
				"patcherrelativepath" : ".",
				"type" : "JSON",
				"implicit" : 1
			}
 ]
	}

}
