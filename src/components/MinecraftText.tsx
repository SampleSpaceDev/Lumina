import React, { ComponentProps } from 'react';
import { formatNum } from '../utils';

/*
* §§§§§§§§§§§§§§§§§§§§§§§§§§§
*/
export function MinecraftText(props: ComponentProps<any>) {

    function parseMinecraftText(str: string) {
        // Binds each minecraft formatting character to a css color class
        const colorNames: { [key: string]: string } = {
            '0': 'black',
            '1': 'darkblue',
            '2': 'darkgreen',
            '3': 'darkaqua',
            '4': 'darkred',
            '5': 'purple',
            '6': 'gold',
            '7': 'gray',
            '8': 'darkgray',
            '9': 'blue',
            'a': 'green',
            'b': 'aqua',
            'c': 'red',
            'd': 'pink',
            'e': 'yellow',
            'f': 'white',
            'g': 'brown',
            'R': 'rainbow',
            'K': 'rainbow font-bold'
        }

        const modifierNames: { [key: string]: string } = {
            'k': 'magic',
            'l': 'bold',
            'm': 'strikethrough',
            'n': 'underline',
            'o': 'italic',
            'r': 'reset',
        }

        let spans = [];
        let charStack: string[] = [];
        // By default, the color of the text is white
        let styling: { color: string, modifiers: string[] } = {
            color: 'white',
            modifiers: []
        }
        // For each character
        for (let i = 0; i < str.length; i++) {
            if (str[i] === '§') {
                // Save all previous characters under the previous style
                if (charStack.length) {
                    spans.push({
                        style: `c-${styling.color} ${styling.modifiers.map(m => 'c-'+m).join(' ')}`,
                        text: charStack.join('')
                    });
                }

                // Clear the saved characters
                charStack = [];
                // The character after the § indicates either the color or modifier of the style
                i++;

                // Evoking a color change resets modifiers
                if (colorNames[str[i]]) {
                    styling.color = colorNames[str[i]];
                    styling.modifiers = [];
                }
                // Evoking a modifier change simply adds the new modifier on top
                else if (modifierNames[str[i]]) {
                    styling.modifiers.push(modifierNames[str[i]]);
                }
            }
            else {
                charStack.push(str[i]);
            }
        }

        // Finally, save the remaining characters
        if (charStack.length) {
            spans.push({
                style: `c-${styling.color} ${styling.modifiers.map(m => 'c-'+m).join(' ')}`,
                text: charStack.join('')
            });
        }

        // If the text to display was intended to be a numerical value
        spans.forEach(span => {
            if (props.formatNum && !isNaN(parseInt(span.text))) {
                span.text = formatNum(Number(span.text));
            }
        })

        return (
            <span className={`font-${props.size || 'md'} ${props.className || ''}`}>
				{spans.map((span, i) => <span key={i} className={`font-minecraft ${span.style}`}>{span.text}</span>)}
			</span>
        );
    }

    return parseMinecraftText(props.children || '');
}