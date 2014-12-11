{
	"patcher" : 	{
		"fileversion" : 1,
		"appversion" : 		{
			"major" : 6,
			"minor" : 0,
			"revision" : 4
		}
,
		"rect" : [ 25.0, 69.0, 640.0, 480.0 ],
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
					"id" : "obj-5",
					"maxclass" : "meter~",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "float" ],
					"patching_rect" : [ 150.0, 217.0, 80.0, 13.0 ],
					"presentation_rect" : [ 150.0, 216.0, 0.0, 0.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-3",
					"maxclass" : "meter~",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "float" ],
					"patching_rect" : [ 352.0, 217.0, 80.0, 13.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-4",
					"maxclass" : "button",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "bang" ],
					"patching_rect" : [ 269.0, 125.0, 20.0, 20.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-2",
					"maxclass" : "ezdac~",
					"numinlets" : 2,
					"numoutlets" : 0,
					"patching_rect" : [ 269.0, 227.0, 45.0, 45.0 ]
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-1",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 3,
					"outlettype" : [ "signal", "signal", "" ],
					"patching_rect" : [ 269.0, 173.0, 60.0, 20.0 ],
					"save" : [ "#N", "rtcmix~", 2, 0, ";", "#X", "restore", 0, 1666, 1666, "// MBOWED(outsk, dur, AMP, FREQ, vibfreqlo, vibfreqhi, VIBDEPTH, PAN, BOWVELENV, BOWPRESSENV, BOWPOSENV, VIBTABLE)\r\n// MBRASS(outsk, dur, AMP, FREQ, SLIDELEN, LIPFILT, maxpressure[, PAN, BREATHENV])\r\n// VSFLUTE(outskip, dur, noiseamp, length1low (samples), length1high (samples), length2low (samples), length2high (samples), amp, vibfreq1low (Hz), vibfreq1high (Hz), vibfreq2low (Hz), vibfreq2high (Hz)[, pan])\r\n\r\n// MBOWED params\r\ndur = 100\r\namp = 15000\r\nvfreqlo = 1\r\nvfreqhi = 2\r\nvdepth = maketable(\"line\", \"nonorm\", 1000, 0,0, 1,0.001)\r\npanBO = makeLFO(\"sine\", .01, 0.3, 0.7)\r\nbowvel = makeLFO(\"sine\", 0.01, 0.2, 0.8)\r\nbowpress = maketable(\"line\", 1000, 0,.1, 1,0.2, 2,1, 3,0.7, 4,1)\nbowpos = maketable(\"line\", 1000, 0,0, 2,1, 3,0)\nvibtable = maketable(\"wave\", 1000, 1, 1)\r\n\r\n// MBRASS params\nbampBR = maketable(\"line\", 1000, 0,0, 1,1, 2,0)\nslideBR = maketable(\"line\", \"nonorm\", 1000, 0,150, 1,160, 3,150)\nlipfiltBR = makeLFO(\"sine\", 0.73, 250, 255)\r\n\r\n// MBLOWBOTL params\r\nampenv = maketable(\"line\", 1000, 0,1, 1,0)\r\npanBT = makeLFO(\"sine\", 0.031, 0.8, 0.2)\r\nbreath = maketable(\"line\", 1000, 0,0.4, 1,1.0, 2,0.6, 3,0.84, 17,0.95)\n\r\n// DO it\r\nfreqy = 50\r\nfor (i = 0; i < 10; i = i + 1) {\r\n\t// waver = freqy / 400\r\n\t// freq = maketable(\"line\", \"nonorm\", 1000, 0,freqy, 1,freqy+waver, 5,freqy)\r\n\tMBOWED(0, dur, amp, freqy, vfreqlo, vfreqhi, vdepth, panBO, bowvel, bowpress, bowpos, vibtable)\r\n\tMBRASS(0, dur, amp/7, freqy*1.333, slideBR, lipfiltBR, 0.3, 0.5, bampBR)\r\n\tMBLOWBOTL(0, dur, amp*ampenv/10, freqy*1.26, 0.1, 0.8, panBT, breath)\r\n\tMBOWED(0, dur, amp/7, freqy*1.5, vfreqlo, vfreqhi, vdepth, panBO, bowvel, bowpress, bowpos, vibtable)\r\n\tfreqy = freqy * 2\r\n}", ";" ],
					"text" : "rtcmix~ 2"
				}

			}
 ],
		"lines" : [ 			{
				"patchline" : 				{
					"destination" : [ "obj-2", 1 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-1", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-2", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-1", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-3", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-1", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-5", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-1", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-1", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-4", 0 ]
				}

			}
 ],
		"dependency_cache" : [  ]
	}

}
