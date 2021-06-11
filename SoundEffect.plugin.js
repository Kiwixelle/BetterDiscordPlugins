/**
 * @name SoundEffects
 * @author DarSitam
 * @authorId 278543574059057154
 * @version 1.0.1
 * @description plugin BetterDiscord qui joue certains sons quand certains mots sont envoyés
 * @source https://github.com/DarSitam/BD-Sound-Effects/blob/main/SoundEffect.plugin.js
 * @updateUrl https://raw.githubusercontent.com/DarSitam/BD-Sound-Effects/main/SoundEffect.plugin.js
 */

 module.exports = (() => {
	const config =
	{
		info: {
			name: "SoundEffects",
			authors: [{
				name: "DarSitam",
				discord_id: "163278545999626240"
			}],
			version: "1.0.1",
			description: "plugin BetterDiscord qui joue certains sons quand certains mots sont envoyés",
            	github: "https://github.com/Metalloriff/BetterDiscordPlugins/blob/master/Bruh.plugin.js",
		    	github_raw: "https://raw.githubusercontent.com/DarSitam/BD-Sound-Effects/main/SoundEffect.plugin.js"
		},
        
		defaultConfig: [{
			id: "general",
			name: "Paramètres",
			type: "category",
			collapsible: true,
			shown: false,
			settings: [{
				id: "onlyCur",
				name: "Salon actif uniquement",
				note: "Quand cette option est activée, uniquement les messages du salon actif enverront du son",
				type: "switch",
				value: true
			}, {
				id: "delay",
				name: "Délai entre chaque son",
				note: "Temps (en ms) entre chaque son",
				type: "slider",
				value: 200,
				min: 10,
				max: 1000,
				renderValue: v => Math.round(v) + "ms"
			}]
		}]
	};

	return !global.ZeresPluginLibrary ? class {
		constructor() { this._config = config; }

		getName = () => config.info.name;
		getAuthor = () => config.info.description;
		getVersion = () => config.info.version;

		load() {
			BdApi.showConfirmationModal("Library Missing", `The library plugin needed for ${config.info.name} is missing. Please click Download Now to install it.`, {
				confirmText: "Download Now",
				cancelText: "Cancel",
				onConfirm: () => {
					require("request").get("https://rauenzi.github.io/BDPluginLibrary/release/0PluginLibrary.plugin.js", async (err, res, body) => {
						if (err) return require("electron").shell.openExternal("https://betterdiscord.net/ghdl?url=https://raw.githubusercontent.com/rauenzi/BDPluginLibrary/master/release/0PluginLibrary.plugin.js");
						await new Promise(r => require("fs").writeFile(require("path").join(BdApi.Plugins.folder, "0PluginLibrary.plugin.js"), body, r));
					});
				}
			});
		}

		start() { }
		stop() { }
	} : (([Plugin, Api]) => {

		const plugin = (Plugin, Api) => { try {
			const {
				DiscordModules: { Dispatcher, SelectedChannelStore }
			} = Api;

			const audio = new Audio();

			return class Bruh extends Plugin {
				constructor() {
					super();
				}

				getSettingsPanel() {
					return this.buildSettingsPanel().getElement();
				}
	
				onStart() {
					Dispatcher.subscribe("MESSAGE_CREATE", this.messageEvent);
				}
				
				messageEvent = async ({ channelId, message, optimistic }) => {
					if (this.settings.general.onlyCur && channelId != SelectedChannelStore.getChannelId())
						return;

					
                    if (!optimistic) {

                        
						if(message.content.match(/sanae/))
                            {
                                audio.src = "https://www.myinstants.com/media/sounds/cow2.mp3";
					            audio.play();
                            }
                        
                        else if(message.content.match(/bruh/))
                            {
                                audio.src = "https://www.myinstants.com/media/sounds/bruh-sound-effect-1.mp3";
					            audio.play();
                            }

                        else if(message.content.match(/hentai/))
                            {
                                audio.src = "https://www.myinstants.com/media/sounds/yamete_kudasai.mp3";
					            audio.play();
                            }

                        else if(message.content.match(/arabe/))
                            {
                                audio.src = "https://www.myinstants.com/media/sounds/explode1.mp3";
					            audio.play();
                            }

                        else if(message.content.match(/merde/))
                            {
                                audio.src = "https://www.myinstants.com/media/sounds/fartmeme.mp3";
					            audio.play();
                            }

                        else if(message.content.match(/francais/) || message.content.match(/français/))
                            {
                                audio.src = "https://www.myinstants.com/media/sounds/pigs-minecraft.mp3";
					            audio.play();
                            }

                        else if(message.content.match(/bismillah/) || message.content.match(/voile/) || message.content.match(/voilé/))
                            {
                                audio.src = "https://www.myinstants.com/media/sounds/al-bismillah.mp3";
					            audio.play();
                            }

                        else if(message.content.match(/gifle/) || message.content.match(/baffe/))
                            {
                                audio.src = "https://www.myinstants.com/media/sounds/slap-sound-effect-free.mp3";
					            audio.play();
                            }
                        
                        else if(message.content.match(/kiwi/))
                            {
                                audio.src = "https://cdn.discordapp.com/attachments/453251588937744394/852929122157330472/kiwi-ditalie.mp3";
					            audio.play();
                            }

                        else if(message.content.match(/lol/) || message.content.match(/mdr/))
                            {
                                audio.src = "https://www.myinstants.com/media/sounds/laughter-short.mp3";
					            audio.play();
                            }

                        else if(message.content.match(/tg/) || message.content.match(/ta gueule/))
                            {
                                audio.src = "https://www.myinstants.com/media/sounds/ta-gueule_qAtCvxt.mp3";
					            audio.play();
                            }

                        else if(message.content.match(/pornhub/))
                            {
                                audio.src = "https://www.myinstants.com/media/sounds/pornhub-community-intro.mp3";
					            audio.play();
                            }


						await new Promise(r => setTimeout(r, this.settings.general.delay));
					}
				};
				
				onStop() {
					Dispatcher.unsubscribe("MESSAGE_CREATE", this.messageEvent);
				}
			}
		} catch (e) { console.error(e); }};

		return plugin(Plugin, Api);
	})(global.ZeresPluginLibrary.buildPlugin(config));
})();
