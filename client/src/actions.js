export default function buildActions(state, sendMessage, callbacks) {
    const actions = [
        {
          display: "Refresh Clients",
          smallsrc: "images/icons/refresh.png",
          action: () => sendMessage({refresh: true}),
          onlineOnly: true
        },
        { 
          display: "Go Offline",
          smallsrc: "images/icons/right.png",
          action: () => window.location.href = '/offline',
          onlineOnly: true
        },
        { 
          display: "Go reduced",
          smallsrc: "images/icons/right.png",
          action: () => window.location.href = '/reducedselector',
          onlineOnly: true
        },
        // {
        //   display: state.show3d ? "Turn off 3d" : "Turn on 3d",
        //   smallsrc: "images/icons/right.png",
        //   action: () => sendMessage({show3d: !state.show3d})
        // },
        // {
        //   display: state.pointLight ? "Switch to ambient" : "Switch to point light",
        //   smallsrc: "images/icons/right.png",
        //   action: () => sendMessage({pointLight: !state.pointLight})
        // },
        {
          display: state.inverted ? "Turn off inverted" : "Turn on inverted",
          smallsrc: "images/icons/right.png",
          action: () => sendMessage({inverted: !state.inverted})
        },
        {
          display: state.showStarfield ? "Hide Starfield" : "Show Starfield",
          smallsrc: "images/icons/right.png",
          action: () => sendMessage({showStarfield: !state.showStarfield})
        },
        {
          display: state.showMoons ? "Hide Moons" : "Show Moons",
          smallsrc: "images/icons/right.png",
          action: () => sendMessage({showMoons: !state.showMoons})
        },
        {
          display: state.showStats ? "Hide Stats" : "Show Stats",
          smallsrc: "images/icons/right.png",
          action: () => sendMessage({showStats: !state.showStats})
        },
        {
          display: "Call hook",
          smallsrc: "images/icons/right.png",
          action: () => callbacks.stuff("stuff")
        }
      ];

      return actions;
}