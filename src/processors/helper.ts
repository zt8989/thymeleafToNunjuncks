export function getElementStringWithoutChildren(element: Element): [string, string] {
    const elementString = element.outerHTML.replace(element.innerHTML || "", "")
    const splitIndex = elementString.search(/<\//)
    if(splitIndex === -1){
        return [elementString, ""]
    }else{
        return [elementString.slice(0, splitIndex) ,elementString.slice(splitIndex)]
    }
}