export function getElementStringWithoutChildren(element: Element){
    const elementString = element.outerHTML.replace(element.innerHTML || "", "")
    const splitIndex = elementString.search(/<\//)
    return [elementString.slice(0, splitIndex), elementString.slice(splitIndex)]
}