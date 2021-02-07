import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  constructor(public modal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  /*public onSelectUserChange(newValue: IOption, usuario: IUsuario): void {
    this.usuSrv
    .cambiaEstado(usuario.id_usuario, newValue.value as unknown as EUsuNivel)
    .subscribe((res) => usuario.nivel = res );
  }

  public onCancelPedido(pedido: IPedido) {
    this.pdSrv
      .cambiaEstado(pedido.id_pedido, EEstado.CANCELADO)
      .subscribe((res) => {
        this.modal.close('Close click');
        return pedido.estado = res;
      } );
  }*/
}
