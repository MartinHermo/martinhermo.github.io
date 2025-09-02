from Funciones import *

'''Programa Principal'''
repetir="si"
while(repetir=="si") or (repetir=="Si"):
    
    C=[]
    d=int(input("Ingrese dimensión del Espacio: \n"))
    n=int(input("Ingrese cantidad de vectores del Conjunto: \n"))
    C=Crear(C,d,n)

    if(Fila_Nula(C,d)==True):
        C=Cambia_Fila(C,d,n)

    if (Dimensión(n,d)==False):
        if(Fila_Igual(C,n)==False):
            if(Fila_Nula(C,d)==True):
                if(Gauss(C,d,n)==True):
                    print("\n El conjunto es Linealmente Independiente")
                else:
                    print("\n El conjunto es Linealmente Dependiente")
            else:
                print("\n El conjunto es Linealmente Dependiente")
        else:
            print("\n El conjunto es Linealmente Dependiente")
    else:
        print("\nEl conjunto es Linealmente Dependiente")

    repetir=input("\n \n¿Desea analizar otro Conjunto?. \n Responda con si o no. \n")
